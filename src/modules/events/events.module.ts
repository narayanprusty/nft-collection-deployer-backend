import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './providers/events.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})

export class EventsModule {}