import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import * as mongoose from 'mongoose'
import { App } from './schemas/app.schemas';
import { AppRepository } from './app.repository';
import { UpdateAppDto } from './dto/updateAppDto';
@Injectable()
export class AppService {
    constructor (private readonly httpService: HttpService, private readonly appRepository: AppRepository) {}
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
    
    getAppById(appId: string): Promise<App> {
        return this.appRepository.findOne({appId})
    }
    
    createApp(name: string, age: number, breed: string): Promise<App> {
        return this.appRepository.create({
            name,
            age,
            breed
        })
    }
    
    updateAppById(appId: string, appUpdateData: UpdateAppDto): Promise<App> {
        return this.appRepository.findOneAndUpdate({appId},appUpdateData)
    }
}
