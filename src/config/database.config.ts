import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '../infra/entity/user.entity';
import { AdditionalProfileEntity } from '../infra/entity/additional-profile.entity';
import { UserBenefitEntity } from '../infra/entity/user-benefit.entity';
import { UserTokenEntity } from '../infra/entity/user-token.entity';
import { AdminAuthorityEntity } from '../infra/entity/admin-authority.entity';
import { AdminUserEntity } from '../infra/entity/admin-user.entity';
import { AdvertisementBannerEntity } from '../infra/entity/advertisement-banner.entity';
import { AdvertisementContentDetailEntity } from '../infra/entity/advertisement-content.detail.entity';
import { AdvertisementContentEntity } from '../infra/entity/advertisement-content.entity';
import { ContentBenefitHistoryEntity } from '../infra/entity/content-benefit.history.entity';
import { FileIndexEntity } from '../infra/entity/file-index.entity';
import { MediaFileEntity } from '../infra/entity/media-file.entity';
import { PointHistoryEntity } from '../infra/entity/point-history.entity';
import { WholeSaleDealEntity } from '../infra/entity/whole-sale-deal.entity';
import { WholeSaleDealPointEntity } from '../infra/entity/whole-sale-deal-point.entity';
import { WithdrawalEntity } from '../infra/entity/withdrawal.entity';
import { YottoIssueEntity } from '../infra/entity/yotto-issue.entity';
import { YottoSavingEntity } from '../infra/entity/yotto-saving.entity';
import { YottoWinEntity } from '../infra/entity/yotto-win.entity';
import { YottoMasterEntity } from '../infra/entity/yotto-master.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'www.diveand.com', //process.env.DATABASE_HOST,
      port: 33306, //Number(process.env.DATABASE_PORT),
      username: 'root', //process.env.DATABASE_USERNAME,
      password: 'kcoding123!@#', //process.env.DATABASE_PASSWORD,
      database: 'signal',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [
        UserEntity,
        AdditionalProfileEntity,
        UserBenefitEntity,
        AdminAuthorityEntity,
        AdminUserEntity,
        AdvertisementBannerEntity,
        AdvertisementContentDetailEntity,
        AdvertisementContentEntity,
        ContentBenefitHistoryEntity,
        FileIndexEntity,
        MediaFileEntity,
        PointHistoryEntity,
        UserTokenEntity,
        WholeSaleDealEntity,
        WholeSaleDealPointEntity,
        WithdrawalEntity,
        YottoIssueEntity,
        YottoSavingEntity,
        YottoWinEntity,
        YottoMasterEntity,
      ],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'Z',
      logging: true,
    }),
  ],
})
export class DatabaseConfig {}
