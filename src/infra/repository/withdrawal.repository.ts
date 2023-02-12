import { EntityRepository, Repository } from 'typeorm';
import { WithdrawalEntity } from '../entity/withdrawal.entity';
import { YottoIssueReq } from '../../api/benefit/interface/dto/yotto-issue.req';
import { UserEntity } from '../entity/user.entity';
import { YottoIssueEntity } from '../entity/yotto-issue.entity';
import { YottoMasterEntity } from '../entity/yotto-master.entity';

@EntityRepository(WithdrawalEntity)
export class WithdrawalRepository extends Repository<WithdrawalEntity> {
  async findLastWithdrawal(user: UserEntity): Promise<WithdrawalEntity> {
    let ret = null;
    ret = await this.findOne({
      where: { user: user, withdrawFinishAt: null },
    });
    return ret;
  }
}
