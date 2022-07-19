import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
    constructor (private readonly httpService: HttpService) {}
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



}
