import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule as ServerBModule } from 'server-c-event';

@Module({
  imports: [ServerBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
