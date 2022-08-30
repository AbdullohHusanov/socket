import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import * as mongoose from 'mongoose'
import { App } from './schemas/app.schema';
import { AppRepository } from './app.repository';
import { UpdateAppDto } from './dto/updateAppDto';
import { CreateAppDto } from './dto/createAppDto';
import { PushService } from './push.service'
import { UsersTextDto } from './dto/usersTextDto';

@Injectable()
export class AppService {
    constructor (
        private readonly httpService: HttpService, 
        private readonly appRepository: AppRepository,
        private readonly pushService: PushService) {}
    getHello(): string {
        return 'Hello World!';
    }
    public token
    public async notification () {
        let data = await this.httpService.get('http://localhost:3002/products/notification', {
            headers: {
                'Accept': 'application/json'
            }
        }).pipe(
            map(response => response.data)
        )
        return lastValueFrom(data)
    }
    
    checkUser(userlist, user_id):boolean {
        let users = []
        
        userlist.map(id => users.push(id.userid))                  
        if(users.includes(+user_id)){            
            return true
        } else {
            return false
        }
    }

    getApps(): Promise<App[]> {
        return this.appRepository.find({})
    }
    
    async getAppsById(user_id: string): Promise<App[]> {
        let app = await this.appRepository.findOne({user_id})        
        return app
    }

    async getAppsByList(usersListAndMessage: UsersTextDto): Promise<App[]> {
        let apps = await this.appRepository.findMany(usersListAndMessage.usersList)
        console.log(usersListAndMessage.notificationText);        
        for(let app of apps) {
            this.pushService.pushr(app, usersListAndMessage.notificationText)
            console.log(app, usersListAndMessage.notificationText);
            
        }
        return apps
    }

    createApp(data: CreateAppDto): Promise<App> {
        return this.appRepository.create(data)
    }
}
