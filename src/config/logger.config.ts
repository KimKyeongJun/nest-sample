import * as winston from 'winston';
import { Module } from '@nestjs/common';

import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('yujalabs-Api', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  ],
})
export class LoggerModule {}
