import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'nest_queue',
          exchangeType: 'direct',
          routingKey: 'nest_routing_key',
        },
      },
      {
        name: 'NEST_SERVICE_1',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'nest_queue_1',
          exchange: 'direct_ex',
          exchangeType: 'direct',
          routingKey: 'nest_routing_key_1',
        },
      },
    ]),

    // RabbitMQModule.forRoot({
    //   uri: ['amqp://localhost'],
    //   exchanges: [
    //     {
    //       name: 'direct_exchange',
    //       type: 'direct',
    //     },
    //   ],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
