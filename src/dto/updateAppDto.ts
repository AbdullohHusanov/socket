export interface UpdateAppDto {
    endpoint: string,
    expirationTime?: null | number,
    keys: {
        p256dh: string,
        auth: string
    },
    organisation_id: string,
    user_id: string
} 