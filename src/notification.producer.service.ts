import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable() 
export class NotificationProducerService {
    constructor (@InjectQueue('notification-queue') private queue: Queue) {}

    async sendMessage (data: string, users: Array<any>, server: any  ) {
        // console.log(server);
        
        await this.queue.add('notification-job', {
            users: users,
            text: data
        }, {delay: 2000})
    }
}