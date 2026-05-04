# Projeto de Prática NestJS + RabbitMQ

Um projeto prático para explorar **arquitetura orientada a eventos** usando **NestJS** e **RabbitMQ**. Este repositório demonstra como construir microsserviços desacoplados que se comunicam de forma assíncrona por meio de um message broker.

## Arquitetura

O projeto implementa um fluxo simples de processamento de pedidos com **3 microsserviços** conectados por meio de um **topic exchange**:

### Serviços

| Serviço               | Papel                                                         | Porta         |
| --------------------- | ------------------------------------------------------------- | ------------- |
| **order_publisher**   | API REST que recebe pedidos e publica eventos `order.created` | 3000          |
| **inventory-service** | Consome eventos de pedido para gerenciar estoque/inventário   | Microsserviço |
| **payment-service**   | Consome eventos de pedido para processar pagamentos           | Microsserviço |

### Conceitos Abordados

- Roteamento com **Topic Exchange** e distribuição de mensagens baseada em padrões
- Padrão **Publisher/Subscriber** com serviços desacoplados
- **Microsserviços do NestJS** com `@nestjs/microservices` (transporte RMQ)
- Uso de canal **AMQP** bruto com `amqplib`
- **Filas duráveis** e persistência de mensagens
- **Reconhecimento manual** (`noAck: false`)
- **Comunicação orientada a eventos** entre serviços independentes

## Pré-requisitos

- Node.js >= 18
- Docker & Docker Compose

## Começando

### 1. Subir o RabbitMQ

```bash
docker-compose up -d
```

O RabbitMQ ficará disponível em:

- AMQP: `localhost:5672`
- Painel de Gerenciamento: `http://localhost:15672`

### 2. Configurar as Variáveis de Ambiente

Cada serviço possui seu próprio arquivo `.env`. Certifique-se de configurar o `RABBITMQ_URL` e as routing keys corretamente.

### 3. Executar os Serviços

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

## Uso

Crie um pedido enviando uma requisição POST para o Order Publisher:

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": "123", "quantity": 2, "amount": 99.99}'
```

Tanto o **Inventory Service** quanto o **Payment Service** receberão o evento `order.created` simultaneamente por meio de suas respectivas filas.

## Objetivos de Aprendizado

Este projeto foi projetado para ajudar você a praticar:

- Configuração do RabbitMQ com Docker
- Configuração de microsserviços NestJS com transporte RMQ
- Publicação de mensagens usando canais `amqplib` puros
- Consumo de mensagens com decorators `@MessagePattern` do NestJS
- Compreensão de tipos de exchange, routing keys e bindings de filas
- Construção de sistemas resilientes orientados a eventos
