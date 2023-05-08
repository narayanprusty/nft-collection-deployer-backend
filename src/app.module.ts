
 

import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    EventsModule
  ],
})

export class AppModule {}