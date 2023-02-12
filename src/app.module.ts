import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './config/logger.config';
import { ConfigurationModule } from './config/property.config';
import { DatabaseConfig } from './config/database.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostInterceptor } from './common/interceptor/post.interceptor';

@Module({
  imports: [DatabaseConfig, ApiModule, ConfigurationModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
