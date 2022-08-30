import { Injectable } from "@nestjs/common";
import { AppRepository } from "src/app.repository";
import { Generate } from "./token-generate";

@Injectable()
export class AdminService {
    constructor(private readonly appRepository: AppRepository){}

    async setToken(): Promise<any>{
        let users = await this.appRepository.findUser()
        // console.log(users);
        for (let i of users) {
            let token = Generate(i.user_name)
            let dds = await this.appRepository.setTokenToUser(i._id, token)
            // console.log(dds, token);   
        }
    }
}