import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SendDataGateway } from "./send.data.gateway";
import { SendDataService } from "./send.data.service";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [SendDataGateway, SendDataService],
})

export class SendDataModule{}