import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nagiyev9:nagiyev9@cluster0.0m4t7s4.mongodb.net/user-service',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ClientsModule.register([
      {
        transport: Transport.RMQ,
        name: 'RABBITMQ_PRODUCT',
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'get_product_queue',
          exchangeType: 'direct',
          routingKey: 'get_product_key',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
