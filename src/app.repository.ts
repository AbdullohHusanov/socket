import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { App, AppDocument } from "./schemas/app.schemas";

@Injectable()
export class AppRepository {
    constructor (@InjectModel(App.name) private appModel: Model<AppDocument>) {}

    async find(appFilterQuery: FilterQuery<App>): Promise<App[]> {
        return this.appModel.find(appFilterQuery)
    }

    async findOne(appFilterQuery: FilterQuery<App>): Promise<App>{
        return this.appModel.findOne(appFilterQuery)
    }

    async create(app: App): Promise<App> {
        const newApp = new this.appModel(app)
        return newApp.save()
    }

    async findOneAndUpdate(appFilterQuery: FilterQuery<App>, app: Partial<App>): Promise<App> {
        return this.appModel.findOneAndUpdate(appFilterQuery, app)
    }
}