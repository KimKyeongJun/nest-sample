import { EntityRepository, Repository } from 'typeorm';
import { YottoMasterEntity } from '../entity/yotto-master.entity';

@EntityRepository(YottoMasterEntity)
export class YottoMasterRepository extends Repository<YottoMasterEntity> {
  async findThisWeekYotto(): Promise<number> {
    const yottoMasterEntity = await this.createQueryBuilder('yottoMaster')
      .select('MIN(yottoMaster.round)', 'round')
      .where('yottoMaster.expired_flag = :flag', { flag: 'N' })
      .getRawOne();
    return yottoMasterEntity.round;
  }
  async findByRound(round: number): Promise<YottoMasterEntity> {
    let ret = null;
    if (round == 0) {
      ret = await this.findOne({ where: { expiredFlag: 'N' } });
    } else {
      ret = await this.findOne({ where: { round: round } });
    }

    return ret;
  }
}
