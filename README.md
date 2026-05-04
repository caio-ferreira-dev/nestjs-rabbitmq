# NestJS + RabbitMQ Practice Project

A hands-on practice project to explore **event-driven architecture** using **NestJS** and **RabbitMQ**. This repository demonstrates how to build decoupled microservices that communicate asynchronously through message brokers.

## Architecture

The project implements a simple order processing flow with **3 microservices** connected via a **topic exchange**:

### Services

| Service               | Role                                                               | Port         |
| --------------------- | ------------------------------------------------------------------ | ------------ |
| **order_publisher**   | REST API that receives orders and publishes `order.created` events | 3000         |
| **inventory-service** | Consumes order events to manage stock/inventory                    | Microservice |
| **payment-service**   | Consumes order events to process payments                          | Microservice |

### Key Concepts Covered

- **Topic Exchange** routing with pattern-based message distribution
- **Publisher/Subscriber** pattern with decoupled services
- **NestJS Microservices** with `@nestjs/microservices` (RMQ transport)
- **Raw AMQP** channel usage with `amqplib`
- **Durable queues** and message persistence
- **Manual acknowledgment** (`noAck: false`)
- **Event-driven communication** between independent services

## Prerequisites

- Node.js >= 18
- Docker & Docker Compose

## Getting Started

### 1. Start RabbitMQ

```bash
docker-compose up -d
```

RabbitMQ will be available at:

- AMQP: `localhost:5672`
- Management UI: `http://localhost:15672`

### 2. Configure Environment Variables

Each service has its own `.env` file. Make sure to set the `RABBITMQ_URL` and routing keys accordingly.

### 3. Run the Services

```bash
# Order Publisher (HTTP API)
cd order_publisher
npm run start:dev

# Inventory Service
cd inventory-service
npm run start:dev

# Payment Service
cd payment-service
npm run start:dev
```

## Usage

Create an order by sending a POST request to the Order Publisher:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": "123", "quantity": 2, "amount": 99.99}'
```

Both the **Inventory Service** and **Payment Service** will receive the `order.created` event simultaneously through their respective queues.

## Learning Goals

This project is designed to help you practice:

- Setting up RabbitMQ with Docker
- Configuring NestJS microservices with RMQ transport
- Publishing messages using raw `amqplib` channels
- Consuming messages with NestJS `@MessagePattern` decorators
- Understanding exchange types, routing keys, and queue bindings
- Building resilient event-driven systems
