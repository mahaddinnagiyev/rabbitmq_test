import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nagiyev9:nagiyev9@cluster0.0m4t7s4.mongodb.net/user-service',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
