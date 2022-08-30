import { Module } from "@nestjs/common";
import { AdminModule } from '@adminjs/nestjs';
import { MongooseSchemasModule } from '../mongoose/mongoose.schemas.module';
import { Model } from 'mongoose';
import { getModelToken } from "@nestjs/mongoose";
import AdminJS from 'adminjs'
import { Database, Resource } from '@adminjs/mongoose'
import { Admin } from "src/mongoose/admin.model";
import { Post } from "src/mongoose/post.model";
import { App } from "src/schemas/app.schema";
import { Users } from "src/mongoose/user.model";
import passwordsFeature from "@adminjs/passwords";
import * as argon2 from "argon2";
import { AdminService } from "./admin.service";
import { AppRepository } from "src/app.repository";
import { Organisation } from "src/mongoose/organisation.model";
import { AppModel } from '../mongoose/app.model';
import { User } from "src/schemas/user.schema";

AdminJS.registerAdapter({Database, Resource})

@Module({
    imports: [    
        AdminModule.createAdminAsync({
            imports: [
                MongooseSchemasModule
            ],
            inject: [
                getModelToken('Admin'),
                getModelToken('Post'),
                getModelToken('App'),
                getModelToken('Users'),
                getModelToken('User'),
                getModelToken('Organisation')
            ],
            useFactory: (
                adminModel: Model<Admin>,
                postModel: Model<Post>, 
                appModel: Model<App>, 
                userModel: Model<User>, 
                usersModel: Model<Users>, 
                organisationModel: Model<Organisation>
            ) => ({
                adminJsOptions: {
                    rootPath: '/admin',
                    resources: [
                        { resource: appModel },
                        { resource: userModel },
                        { resource: organisationModel },

                        { resource: adminModel,
                            isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
                            options: {
                                properties: { encrypted: { isVisible: false } },
                              },
                              features: [passwordsFeature({
                                properties: {
                                  // to this field will save the hashed password
                                  encryptedPassword: 'encrypted'
                                },
                                hash: argon2.hash,
                            })]
                        },

                        { resource: postModel , 
                            options: { 
                                properties: {
                                    createdAt: {
                                        isVisible: { list: true, filter: true, show: true, edit: false },
                                    },
                                    updatedAt: {
                                        isVisible: { list: true, filter: true, show: true, edit: false },
                                    }
                                }
                            },
                        },

                        { resource: usersModel,
                            options: {
                                properties: { 
                                    encrypted: { isVisible: false },
                                    createdAt: {
                                        isVisible: { list: true, filter: true, show: true, edit: false },
                                    },
                                    updatedAt: {
                                        isVisible: { list: true, filter: true, show: true, edit: false },
                                    },
                                    user_token: {
                                        isVisible: { list: true, filter: true, show: true, edit: false }
                                    },
                                    notification_token: {
                                        isVisible: { list: true, filter: true, show: true, edit: false }
                                    }
                                },
                            },
                            features: [passwordsFeature({
                                  // PasswordsOptions
                                properties: {
                                  // to this field will save the hashed password
                                  encryptedPassword: 'encrypted'
                                },
                                hash: argon2.hash,
                            })]
                        }
                    ],
                    // locale:{
                    //   language: 'ru',
                    //     translations: {
                    //         actions: {
                    //             new: "новый",
                    //             edit: "редактировать",
                    //             show: "показывать",
                    //             delete: "Удалить"
                    //         },
                    //         buttons: {
                    //             save: "спасти"
                    //         }
                    //     }
                    // }
                },
                // auth: {
                //     authenticate: async (email, password) => Promise.resolve({ email: 'test' }),
                //     cookieName: 'test',
                //     cookiePassword: 'testPass',
                // },
                // branding: {
                //     companyName: 'BMW c.o.',
                //     logo: 'https://logos-download.com/wp-content/uploads/2016/02/BMW_logo_big_transparent_png-700x700.png',
                //     theme: {
                //         colors: {
                //             primary100: 	"#1C1C38 ", 	
                //             primary80: 	"#454655", 	
                //             primary60: 	"#898A9A", 	
                //             primary40: 	"#C0C0CA", 	
                //             primary20: 	"#898A9A",
                //         }
                //     }
                // },

            }),
            
        }),
        MongooseSchemasModule
    ],
    providers: [AdminService, AppRepository]
})

export class AdminJsModule {}