import { Module } from '@nestjs/common';
//import { LoggerModule } from '../config/logger.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    /*{ provide: APP_INTERCEPTOR, useClass: PostInterceptor }*/
  ],
})
export class ApiModule {}
