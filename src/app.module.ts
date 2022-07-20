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
import { App, AppSchema } from './schemas/app.schemas';
import { AppRepository } from './app.repository';

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
        MongooseModule.forRoot('mongodb://localhost:27017/organisation-app'),
        MongooseModule.forFeature([{name: App.name, schema: AppSchema}])
    ],
    controllers: [AppController],
    providers: [AppService, AppGateway, PushService, NotificationProducerService, NotificationConsumer, EnvService, AppRepository],
})

export class AppModule {}
