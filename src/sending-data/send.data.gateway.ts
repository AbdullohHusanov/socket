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
    
    private users = []

    afterInit(server: any) {
        // throw new Error("Method not implemented.");
    }

    handleDisconnect(client: any) {
        console.log('Disconnect......');
    }

    handleConnection(client: Socket) {
        client.emit('connection')
        client.on('connection', async (arg) => {
            let room = await this.sendDataService.getData(arg)
            client.join(room)
            this.users.push({id: arg, socketId: client.id})
        })
        console.log('connecting......');               
    }


    @SubscribeMessage('send')
    async receiveData(client: Socket, args: any) {
        args.status = 201
       
        let res = await this.sendDataService.getData(args.id)
        let validateData = this.sendDataService.validate(args)
        let length = validateData.length
        
        if(validateData.length) {
            args.status = 400
            args.message = validateData[0] + ' is required!'
        }
        if(length > 1) {
            let s = ''
            for(let i of validateData) {
                s += `${i} `
            }
            args.status = 400
            args.message = s + 'are required!'
        }
        else{
            this.server.to(res).emit('sendData', args)
        }
    }
} 