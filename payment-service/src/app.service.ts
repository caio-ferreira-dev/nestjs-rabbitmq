import { Injectable } from '@nestjs/common';
import { KiwifyGateway } from './gateways/payment/KiwifyGateway';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Injectable()
export class AppService {
  constructor(private readonly kiwifyGateway: KiwifyGateway) {}

  processPayment(data: CreateOrderDto) {
    const parsedData = this.parseData(data);
    this.kiwifyGateway.process(parsedData);
  }

  parseData(data: unknown) {
    return data;
  }
}
