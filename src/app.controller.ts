import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { KeyModel, KeyModelClass } from './models/notification-key.model';
import { PushService } from './push.service';
import { EnvService } from './services/env.service';
import { CreateAppDto } from './dto/createAppDto';
import { UpdateAppDto } from './dto/updateAppDto';
import { App } from './schemas/app.schemas';

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

    @Get('/app-all')
    async all(): Promise<App[]>{
        console.log(await this.appService.getApps());
        
        return this.appService.getApps()
    }

    @Get('/app-all:appId')
    async one(@Param('appId') appId: string): Promise<App> {
        return this.appService.getAppById(appId)
    }

    @Post('/app-create')
    async create(@Body() createAppDto: CreateAppDto): Promise<App> {
        let newApp = this.appService.createApp(createAppDto.name, createAppDto.age, createAppDto.breed)
        return newApp
    }

    @Patch('/app-patch:appId')
    async patch(@Param('appId') appId: string, updateAppDto: UpdateAppDto): Promise<App> {
        return this.appService.updateAppById(appId, updateAppDto)
    }
}