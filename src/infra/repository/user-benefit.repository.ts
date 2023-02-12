import { EntityRepository, Repository } from 'typeorm';
import { UserBenefitEntity } from '../entity/user-benefit.entity';
import { UserEntity } from '../entity/user.entity';
import { YottoSavingReq } from '../../api/benefit/interface/dto/yotto-saving.req';
import { YottoSavingEntity } from '../entity/yotto-saving.entity';
import { UserBenefitReq } from '../../api/benefit/interface/dto/user-benefit.req';

@EntityRepository(UserBenefitEntity)
export class UserBenefitRepository extends Repository<UserBenefitEntity> {
  async findMyTotalPoint(user: UserEntity): Promise<UserBenefitEntity> {
    const userBenefitEntity = await this.createQueryBuilder('userBenefit')
      .select('IFNULL(SUM(userBenefit.point), 0) AS point')
      .where('userBenefit.user_seq = :userSeq', { userSeq: user.userSeq })
      .getRawOne();
    return userBenefitEntity;
  }

  async findUserBenefits(
    dto: UserBenefitReq,
    user: UserEntity,
  ): Promise<[UserBenefitEntity[], number]> {
    const queryBuilder = await this.createQueryBuilder('userBenefit')
      .innerJoin('userBenefit.user', 'user')
      .where('user.userSeq = :userSeq', {
        userSeq: user.userSeq,
      })
      .orderBy('userBenefit.createAt', 'DESC')
      .limit(dto.getLimit())
      .offset(dto.getOffset());

    if (!dto.searchStartDate === false && !dto.searchEndDate === false) {
      const startDate = new Date(dto.searchStartDate + 'T00:00:00');
      const endDate = new Date(dto.searchEndDate + 'T23:59:59');
      queryBuilder.andWhere(
        'userBenefit.createAt BETWEEN :startDate AND :endDate',
        {
          startDate: startDate,
          endDate: endDate,
        },
      );
    }

    return queryBuilder.disableEscaping().getManyAndCount();
  }
}
