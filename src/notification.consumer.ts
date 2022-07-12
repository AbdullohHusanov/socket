import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { push } from 'web-push'
import { AppGateway } from "./app.gateway"
import { AppService } from "./app.service"

@Processor('notification-queue')

export class NotificationConsumer {

    constructor (private appGateway: AppGateway, private appService: AppService) {}

    @Process('notification-job')
    notificationJob (job: Job<any>) {
        for(let user of job.data.users) {
            this.appGateway.server.to(user.socketId).emit('notification', job.data.text)
        }
    }
    
    @Process('n-users-send-with-queue')
    nJob (job: Job<any>) {
        // this.notificationJob()
    }
}