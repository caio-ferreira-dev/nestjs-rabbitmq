import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const rabbitMqUrl = configService.getOrThrow<string>('RABBITMQ_URL');
  const routingKey = configService.getOrThrow<string>('RABBITMQ_ORDER_KEY');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: 'inventory.order.created',
      exchange: 'orders.exchange',
      exchangeType: 'topic',
      routingKey,
      queueOptions: {
        durable: true,
      },
    },
    noAck: false,
  });
  await app.listen();
}
bootstrap();
