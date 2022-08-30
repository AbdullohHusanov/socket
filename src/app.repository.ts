import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { App, AppDocument } from "./schemas/app.schema";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class AppRepository {
    constructor (
        @InjectModel(App.name) private appModel: Model<AppDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async find(appFilterQuery: FilterQuery<App>): Promise<App[]> {
        return this.appModel.find(appFilterQuery)
    }

    async findUser(): Promise<User[]> {
        return this.userModel.find()
    }

    async setTokenToUser(userId: ObjectId, token: string): Promise<User> {
        console.log(userId, token);
        
        let newuser = await this.userModel.findByIdAndUpdate(userId, {token: token})
        console.log(newuser);
        
        return newuser
    }

    async findOne(appFilterQuery: FilterQuery<App>): Promise<App[]>{
        console.log(appFilterQuery);
        return this.appModel.find({"user_id": appFilterQuery.user_id})
    }

    async findMany(appFilterQuery: FilterQuery<Array<any>>): Promise<App[]>{
        let usersList = []
        for(let id of appFilterQuery){
            usersList.push(...await this.appModel.find({"user_id": id}))
        }
        
        return usersList
    }
    
    async create(app: App): Promise<App> {        
        const newApp = new this.appModel(app)
        return newApp.save()
    }
}