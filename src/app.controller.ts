import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { KeyModel, KeyModelClass } from './models/notification-key.model';
import { PushService } from './push.service';
import { EnvService } from './services/env.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, 
        private envService: EnvService,
        private pushService: PushService) {}
    public token 
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
    
    @Post('/gettoken')
    gettoken (@Body() sw: any): any {
        return this.pushService.pushr(sw);
    }

    @Post('/set-user-token')
    setUserToken(@Body() data: any){
        let key = new KeyModelClass(data);
        this.pushService.pushr(key.getKey());
        return {message: "ok"}
    }

    @Post('/getPublicNotificationKey')
    getPublicNotificationKey(){
        let publicKey = this.pushService.generateVapidKey();
        return {
            message: 'Successfully generated new public key',
            data: {
                publicKey: publicKey.publicKey
            }
        }
    }

    @Get('/test')
    test(){
        this.envService.setEnvValues('TEST','12321421')
        return "ok"
    }
}