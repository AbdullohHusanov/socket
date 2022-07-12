import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: '*'
    }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    
    @WebSocketServer() server: Server;
    
    constructor(private chatService: ChatService){}
   
    private users = []

    afterInit(server: any) {
        // throw new Error('Method not implemented.');
    }

    handleDisconnect(client: any) {
        console.log('Disconnect....');
    }
    
    handleConnection(client: Socket) {
        client.emit('connection')
        client.on('connection', (arg) => {
            this.users.push({id: arg, socketId: client.id})
        })
        
        console.log('Connecting....');
    }
    
    
    @SubscribeMessage('sendMessage')
    handleMessage (client: Socket, message: {sender: string, text: string, sendTo: number}) {
        
        let sendToUser = this.users.filter(el => el.id == message.sendTo)
        sendToUser = sendToUser[sendToUser.length - 1].socketId
        let thisuser = this.users.filter(el => el.id == message.sender)
        
        this.server.to(sendToUser).emit('receiveMessage', message.sendTo, message.sender, message.text)
        // if(sendToUser == []) {
        // }
        // else {
        //     this.server.to(thisuser[thisuser.length - 1].socketId).emit('receiveMessage', message.sender, 'bunaqa user yoq')
        // }
        // console.log(this.users);
        // console.log(sendToUser);
        console.log(sendToUser[sendToUser.length - 1]);
        console.log(message.sendTo);
    }
}
