import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    imports: [HttpModule],
    providers: [ChatService, ChatGateway],
    exports: [ChatModule]
})
export class ChatModule {}
