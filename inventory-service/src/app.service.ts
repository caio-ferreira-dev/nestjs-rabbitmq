import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  process(data) {
    console.log(data, 'INVENTORY -SERVICE');
  }
}
