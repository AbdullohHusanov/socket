import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket,Server } from "socket.io";
import { SendDataService } from "./send.data.service";

@WebSocketGateway({
    namespace: '/sendData',
    cors: {
        origin: "*"
    }
})

export class SendDataGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
    
    constructor(private sendDataService: SendDataService){}
    
    @WebSocketServer() server: Server;
   
    afterInit(server: any) {
        // throw new Error("Method not implemented.");
    }

    handleDisconnect(client: any) {
        console.log('Disconnect......');
        
        // throw new Error("Method not implemented.");
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('connecting......');        
        // throw new Error("Method not implemented.");
    }


    @SubscribeMessage('send')
    async receiveData(client: Socket, args: any) {
        let res = await this.sendDataService.getData(args.id)
        let validateData = this.sendDataService.validate(args.data)
        console.log(res, ' ', args.data);
        client.join(res)
        this.server.to(res).emit(args.data)
    }

    @SubscribeMessage('sendData')
    sendData(client: Socket, data: any) {

    }
}