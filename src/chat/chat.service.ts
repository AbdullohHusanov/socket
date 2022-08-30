import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
    constructor (private httpService: HttpService){}
   
    async sendToBackend (sender: string, message: string, reciever: string) {
        await this.httpService.post('http://localhost:3002/product/chat', {
            data: JSON.stringify({})
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}