import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom, map, retry } from "rxjs";

@Injectable()
export class SendDataService {
    constructor (private readonly httpService: HttpService) {}
    async getData (token) {
        let data = await this.httpService.post('http://localhost:3002/products', {"token": token}, {
            headers: {
                'Accept': 'application/json'
            }
        }).pipe(
            map(response => response.data),
        ) 
        return lastValueFrom(data)
    }

    validate (data: any) {
        if(data && typeof data === 'string') {
            return data
        } else if (typeof data !== 'string') {
            return 'type string bo\'lishi kerak'
        }
    }
}