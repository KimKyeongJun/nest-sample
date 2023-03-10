import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'local'
          ? '.env.local'
          : process.env.NODE_ENV === 'development'
          ? '.env.dev'
          : process.env.NODE_ENV === 'production'
          ? '.env.prod'
          : '.env.local',
    }),
  ],
})
export class ConfigurationModule {}
