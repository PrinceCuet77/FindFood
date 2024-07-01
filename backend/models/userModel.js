const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    gender: String,
    avatar: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    Wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: String
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
