import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQProvider implements OnModuleInit {
  private connection: amqp.connection;
  private channel: amqp.channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const connectionUrl = this.configService.get<string>('RABBITMQ_URL');
    this.connection = await amqp.connect(connectionUrl);

    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange('orders.exchange', 'topic', {
      durable: true,
    });

    console.log('RabbitMQ connection stablished');
  }

  publish(exchange: string, routingKey: string, message: unknown) {
    const newMessage = {
      pattern: routingKey,
      data: message,
    };

    this.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(newMessage)),
    );
  }
}
