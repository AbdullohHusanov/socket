import { Body, Controller, Get, Options, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { KeyModel, KeyModelClass } from './models/notification-key.model';
import { PushService } from './push.service';
import { EnvService } from './services/env.service';
import { UsersTextDto } from './dto/usersTextDto';
import { UpdateAppDto } from './dto/updateAppDto';
import { App } from './schemas/app.schema';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from './admin/admin.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService, 
        private envService: EnvService,
        private pushService: PushService,
        private jwtService: JwtService,
        private adminService: AdminService
    ) {}
    public token 

    @Post()
    getHello(@Body() name: string): any {
        
        return this.adminService.setToken()
        // console.log(name);
        // let payload = this.jwtService.sign(name)
        // return payload
    }
    
    // @Post('/gettoken')
    // gettoken (@Body() sw: any): any {
    //     return this.pushService.pushr(sw);
    // }

    @Post('/set-user-token')
    setUserToken(@Body() data: any){
        console.log(data);
        
        let key = new KeyModelClass(data.token);
        this.pushService.pushr(key.getKey(), 'nima gap');        
        data.token.organisation_id = data.user_data.organisation_id
        data.token.user_id = data.user_data.user_id
        this.appService.createApp(data.token)
        
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

    // @Get('/test')
    // test(){
    //     this.envService.setEnvValues('TEST','12321421')
    //     return "ok"
    // }

    // @Get('/app-all')
    // async all(): Promise<App[]>{        
    //     let users = await this.appService.getApps()
    //     setTimeout(() => {
    //     for(let user = 0; user < users.length - 1; user++) {
    //             console.log(users[user]);
    //             this.pushService.pushr(users[user])
    //         }
    //     }, 5000)
        
    //     return []
    // }

    // @Get('/app-all/:appId')
    // async one(@Param('appId') appId: string): Promise<App[]> {
        
    //     console.log(appId);
    //     let app = await this.appService.getAppsById(appId)
    //     return []
    // }

    // @Get('/app-all-list')
    // async many(@Body() data: UsersTextDto) {
    //     console.log(data);
        
    //     this.appService.getAppsByList(data)
    //     return 'ok'
    // }

    @Post('/noma')
    async sdgsad(@Body() data: any): Promise<Array<any>> {
        let f = await this.appService.getAppsById('2')

        this.pushService.pushr(f[0], data)
        return [f, data]
    }
}