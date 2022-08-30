import mongoose from 'mongoose';
import * as bcrypt  from 'bcrypt'
const { Schema } = mongoose

export interface Admin extends mongoose.Document {
  email: string,
  password: string,
  token: string,
}

export const AdminSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    token: {
      type: String,
      require: true,
      enum: ['sha256', 'blovfish']
    }
  },{
    timestamps: true
})

AdminSchema.pre('save', function (next) {
  if (this.isModified('password') && this.isModified('email')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

AdminSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};

AdminSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
};