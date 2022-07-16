import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AppService } from "./app.service";
import { NotificationProducerService } from "./notification.producer.service";

@WebSocketGateway({
    namespace: "/notification",
    cors: {
        origin: "*"
    }
})

export class AppGateway {

    @WebSocketServer() server: Server;

    constructor (private appService: AppService, private notificationProducerService: NotificationProducerService) {}

    private usersWithSocketId = []
    public usersForSendNotification = []

    @SubscribeMessage('notification')
    async sendNotification(client: Socket, id: string) {
        let data = await this.appService.notification()
        
        for (let user of this.usersWithSocketId) {
            let result = this.appService.checkUser(data[0].sendTo, user.clientId)
            
            if(result === true) {
                // let findUser = this.usersForSendNotification.find(el => el.clientId == user.clientId)
                // let doubleUser = this.usersWithSocketId.find(el => el.clientId == user.clientId)
                
                // if (doubleUser) {
                //     let i = this.usersWithSocketId.indexOf(doubleUser)
                //     this.usersWithSocketId.splice(i, 1)
                // }
                // if (findUser) {
                //     // findUser.socketId = client.id
                // } else {
                   
                    this.usersForSendNotification.push(user)
                // }
            } 
        } 
        this.usersForSendNotification.forEach(user => {
            // console.log(user);
            if(user.isSend == false || user.n !== data[0].text) {
                // console.log(true , user.clientId, ' ', user.socketId);
                
                this.server.to(user.socketId).emit('notification', data[0].text)
            }
            user.isSend = true
            user.n = data[0].text
        });
        console.log(this.usersForSendNotification); 
        
        // this.notificationProducerService.sendMessage(data[0].text, this.usersForSendNotification, this.server)            
    }

    @SubscribeMessage('connecting')
    handleConnection(client: Socket, id: string) {        
        
        console.log('connecting......');
        console.log(id, ' ', client.id);
        
        // let findUser = this.usersWithSocketId.find(el => el.clientId == id)
        // let undefinedUser = this.usersWithSocketId.find(el => el.clientId == undefined)
        
        // if (undefinedUser) {
        //     let i = this.usersWithSocketId.indexOf(undefinedUser)
        //     this.usersWithSocketId.splice(i, 1)
        // }
        
        // if (findUser) {
        //     findUser.socketId = client.id
        // } else {
            this.usersWithSocketId.push({"clientId": id, "socketId": client.id, "isSend": false})
        // }
    }
}