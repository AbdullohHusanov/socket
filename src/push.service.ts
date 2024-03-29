import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { KeyModel } from './models/notification-key.model';
import { EnvService } from './services/env.service';
let push = require('web-push')

@Injectable()
export class PushService {
    constructor(protected envService: EnvService, private appRepository: AppRepository){

    }
    generateVapidKey(): 
    {
        publicKey:String,
        privateKey:String
    }
    {
        if(
            this.envService.getEnvValue("PUBLIC_KEY_NOTIFICATION") !== null
            && this.envService.getEnvValue("PUBLIC_KEY_NOTIFICATION").length !== 0
             && this.envService.getEnvValue("PRIVATE_KEY_NOTIFICATION") !== null
             && this.envService.getEnvValue("PRIVATE_KEY_NOTIFICATION").length !== 0
             ){
            let key = {
                publicKey: this.envService.getEnvValue("PUBLIC_KEY_NOTIFICATION"),
                privateKey: this.envService.getEnvValue("PRIVATE_KEY_NOTIFICATION")
            }
            console.log(key)
            push.setVapidDetails('mailto:test@code.co.uk', key.publicKey, key.privateKey)

            return key;
        }else{
            let vapidKey = push.generateVAPIDKeys();
            console.log(vapidKey)
            push.setVapidDetails('mailto:test@code.co.uk', vapidKey.publicKey, vapidKey.privateKey)
            this.envService.setEnvValues('PUBLIC_KEY_NOTIFICATION', vapidKey.publicKey)
            this.envService.setEnvValues('PRIVATE_KEY_NOTIFICATION', vapidKey.privateKey)
            return vapidKey; 
        }

    }    
    
    async pushr(token: any, text?: any) {
        let payload = JSON.stringify({title: text.data, body: text.message })//'Lorem ipsum dolar sit amet'})
        console.log(payload); 
        setTimeout(() => {
            push.sendNotification(token, payload)
            console.log('##########################');
        },5000);
    }
}