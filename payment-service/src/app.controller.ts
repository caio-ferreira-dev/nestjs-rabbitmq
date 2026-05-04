import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @EventPattern('order.created')
  payment(order: CreateOrderDto) {
    this.appService.processPayment(order);
  }
}
