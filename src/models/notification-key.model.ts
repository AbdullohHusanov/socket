export interface KeyModel{
    endpoint: string,
    expirationTime?: null | number,
    keys: {
        p256dh: string,
        auth: string
    }
}

export class KeyModelClass{
    public endpoint: string
    public expirationTime?: null | number
    public keys: {
        p256dh: string,
        auth: string
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