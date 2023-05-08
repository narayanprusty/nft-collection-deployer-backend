import {
  Controller,
  Get,
} from '@nestjs/common';
import { EventRo } from './ro/event.ro';
import { EventsService } from './providers/events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  events(): Promise<EventRo[]> {
    return this.eventsService.geEvents();
  }
}