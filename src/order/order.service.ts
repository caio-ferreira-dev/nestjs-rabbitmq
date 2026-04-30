import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  save() {
    console.log('order service log');
    
  }
}
