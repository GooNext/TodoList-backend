const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: false,
      required: true
    },
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      unique: false,
      required: true
    }
  },
  { versionKey: false }
);

type UserType = {
    _id: string;
    name: string;
    login: string;
}

userSchema.pre('save', async function f(this: any) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.pre('findOneAndUpdate', async function f(this: any) {
  this._update.password = await bcrypt.hash(this._update.password, 8);
});

userSchema.statics.toResponse = (user:UserType) => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User