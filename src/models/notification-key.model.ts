export interface KeyModel{
    endpoint: String,
    expirationTime?: null | Number,
    keys: {
        p256dh: String,
        auth: String
    }
}

export class KeyModelClass{
    public endpoint: String
    public expirationTime?: null | Number
    public keys: {
        p256dh: String,
        auth: String
    }

    public constructor(data: KeyModel){
        this.endpoint = data.endpoint
        this.expirationTime = data.expirationTime
        this.keys = data.keys
    }

    public getKey(){
        return {
            endpoint: this.endpoint,
            expirationTime : this.expirationTime,
            keys: this.keys
        }
    }
}