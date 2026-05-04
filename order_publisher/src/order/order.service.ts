import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { RabbitMQProvider } from '../providers/RabbitMQProvider';

@Injectable()
export class OrderService {
  constructor(private readonly rabbitMqProvidaer: RabbitMQProvider) {}
  save(order: CreateOrderDto) {
    this.rabbitMqProvidaer.publish('orders.exchange', 'order.created', order);
    return order;
  }
}
