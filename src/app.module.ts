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
import { PushService } from './push.service';
import { EnvService } from './services/env.service';
import { App, AppSchema } from './schemas/app.schema';
import { AppRepository } from './app.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminJsModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminService } from './admin/admin.service';
import { User, UserSchema } from './schemas/user.schema';
import { UsersSchema } from './mongoose/user.model';

@Module({
    imports: [
        JwtModule.register({
            secret: 'apple',
            signOptions: { expiresIn: '60s' },
        }),
        AdminJsModule,
        SendDataModule,
        HttpModule,
        ChatModule,
        BullModule.forRoot({
            redis: {
                host: "localhost",
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: "notification-queue"
        }),
        MongooseModule.forRoot('mongodb://localhost:27017/organisation-app'),
        MongooseModule.forFeature([{name: App.name, schema: AppSchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: "Users", schema: UsersSchema}])
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AppGateway,
        PushService,
        NotificationProducerService,
        NotificationConsumer,
        EnvService,
        AppRepository,
        AdminService
    ],
})

export class AppModule {}
