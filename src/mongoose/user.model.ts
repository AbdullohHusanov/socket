import mongoose from 'mongoose';
import * as bcrypt  from 'bcrypt'
const { Schema } = mongoose
import { token } from 'src/admin/token-generate'; 
import { KeyModelClass } from 'src/models/notification-key.model';

export interface Users extends mongoose.Document {
    name: string,
    password: string,
    age: number,
    token:  string,
    organisation: mongoose.Types.ObjectId,
    role: string
}

export const UsersSchema = new Schema({
    name: {
        type: String,
        required: true, 
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        validate: {
            validator: (p) => {
                return /^([A-Za-z0-9]{1,10}$)/g.test(p)
            }  
        }
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 90
    },
    token: {
        type: String,
        default: token
    },
    organisation: {
        type: mongoose.Types.ObjectId,
        ref: "Organisation"
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
    // notification_token: {
    //     endpoint: {
    //         type: String,
    //         required: true
    //     },
    //     expirationTime: {
    //         type: null || Number,
    //         required: false
    //     },
    //     keys: {
    //         p256dh: {
    //             type: String,
    //             required: true
    //         },
    //         auth: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // }
  },{
    timestamps: true
})

UsersSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) return next(err);
            
            this.password = hash;
            next();
        });
    }
});

UsersSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);

    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

UsersSchema.statics.isThisEmailInUse = async function (name) {
  if (!name) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ name });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};