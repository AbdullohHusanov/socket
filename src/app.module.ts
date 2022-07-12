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
import { ChatGateway } from './chat/chat.gateway';

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
        ChatModule
    ],
    controllers: [AppController],
    providers: [AppService, AppGateway, NotificationProducerService, NotificationConsumer],
})
export class AppModule {}
