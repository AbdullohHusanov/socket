import mongoose from "mongoose";

export const appKeys = new mongoose.Schema({
    "p256dh": String,
    "auth": String
})