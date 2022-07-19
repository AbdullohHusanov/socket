import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { NotificationConsumer } from './notification.consumer';
import { NotificationProducerService } from './notification.producer.service';
import { SendDataModule } from './sending-data/send.data.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PushService } from './push.service';
import { EnvService } from './services/env.service';
// import webPush from '@types/web-push';

@Module({
    imports: [
        SendDataModule,
        HttpModule,
        BullModule.forRoot({
            redis: {
                host: "localhost",
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: "notification-queue"
        }),
        ChatModule,
        // webPush
        // MongooseModule.forRoot('mongodb://localhost/nest')
    ],
    controllers: [AppController],
    providers: [AppService, AppGateway, PushService, NotificationProducerService, NotificationConsumer, EnvService],
})
export class AppModule {}
