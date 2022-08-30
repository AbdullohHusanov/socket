import mongoose from "mongoose";
import { token } from "src/admin/token-generate";
const {Schema} = mongoose

export interface Organisation extends mongoose.Document {
    organisation_name: string,
    organisation_url: string,
    organisation_token: string,
    app: mongoose.Types.ObjectId
}

export const OrganisationSchema = new Schema({
    organisation_name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 40
    },
    organisation_url: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 64
    },
    organisation_token: {
        type: String,
        default: token
    },
    // app: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AppModelSchema"
    // }
}, {timestamps: true})