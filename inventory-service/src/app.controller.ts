import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('order.created')
  payment(order: any) {
    this.appService.process(order);
  }
}
