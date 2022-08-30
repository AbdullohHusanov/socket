import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PostSchema } from 'src/mongoose/post.model';
import { AppSchema } from 'src/schemas/app.schema';
import { UserSchema } from 'src/schemas/user.schema';

import { AdminSchema } from './admin.model';
import { AppModelSchema } from './app.model';
import { OrganisationSchema } from './organisation.model';
import { UsersSchema } from './user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Admin', schema: AdminSchema },
        { name: 'Post', schema: PostSchema },
        { name: "App", schema: AppSchema },
        { name: "Users", schema: UsersSchema },
        { name: "User", schema: UserSchema },
        { name: "Organisation", schema: OrganisationSchema }
    ]),
  ],
  exports: [MongooseModule],
})
export class MongooseSchemasModule {}