import { EntityRepository, Repository } from 'typeorm';
import { YottoIssueEntity } from '../entity/yotto-issue.entity';
import { YottoIssueRes } from '../../api/benefit/interface/dto/yotto-issue.res';
import { UserEntity } from '../entity/user.entity';
import { YottoIssueReq } from '../../api/benefit/interface/dto/yotto-issue.req';

@EntityRepository(YottoIssueEntity)
export class YottoIssueRepository extends Repository<YottoIssueEntity> {
  async findYottoIssues(
    dto: YottoIssueReq,
    user: UserEntity,
  ): Promise<[YottoIssueEntity[], number]> {
    const queryBuilder = await this.createQueryBuilder('yottoIssue')
      .innerJoin('yottoIssue.yottoSaving', 'yottoSaving')
      .where('yottoSaving.round = :round', { round: dto.round })
      .andWhere('yottoSaving.user.userSeq = :userSeq', {
        userSeq: user.userSeq,
      })
      .orderBy('yottoIssue.createAt', 'DESC')
      .limit(dto.getLimit())
      .offset(dto.getOffset());

    /*
    if (param.hasReservationDate()) {
      queryBuilder.andWhere('article.reservationDate >= :reservationDate', {
        reservationDate: param.reservationDate,
      });
    }

    if (param.hasTitle()) {
      queryBuilder.andWhere('article.title ilike :title', {
        title: `%${param.title}%`,
      });
    }
     */

    return queryBuilder.disableEscaping().getManyAndCount();
  }
}
