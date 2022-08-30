import mongoose from "mongoose";
import { token } from "src/admin/token-generate";

const { Schema } = mongoose

export interface AppModel extends mongoose.Document{
    app_name: string,
    app_url: string,
    app_token: string
}

export const AppModelSchema = new Schema({
    app_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32
    },
    app_url: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 64,
        validate: {
            validator: (value) => {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value)
            }
        }
    },
    app_token: {
        type: String,
        default: token
    }
}, {timestamps: true})