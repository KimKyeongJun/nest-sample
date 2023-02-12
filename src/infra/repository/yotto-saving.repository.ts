import { EntityRepository, Repository } from 'typeorm';
import { YottoSavingEntity } from '../entity/yotto-saving.entity';
import { UserEntity } from '../entity/user.entity';
import { YottoSavingReq } from '../../api/benefit/interface/dto/yotto-saving.req';

@EntityRepository(YottoSavingEntity)
export class YottoSavingRepository extends Repository<YottoSavingEntity> {
  async findYottoSavings(
    dto: YottoSavingReq,
    user: UserEntity,
  ): Promise<[YottoSavingEntity[], number]> {
    const queryBuilder = await this.createQueryBuilder('yottoSaving')
      .innerJoin('yottoSaving.user', 'user')
      .where('user.userSeq = :userSeq', {
        userSeq: user.userSeq,
      })
      .orderBy('yottoSaving.createAt', 'DESC')
      .limit(dto.getLimit())
      .offset(dto.getOffset());

    if (!dto.searchStartDate === false && !dto.searchEndDate == false) {
      const startDate = new Date(dto.searchStartDate + 'T00:00:00');
      const endDate = new Date(dto.searchEndDate + 'T23:59:59');
      queryBuilder.andWhere(
        'yottoSaving.createAt BETWEEN :startDate AND :endDate',
        {
          startDate: startDate,
          endDate: endDate,
        },
      );
    }

    return queryBuilder.disableEscaping().getManyAndCount();
  }
}
