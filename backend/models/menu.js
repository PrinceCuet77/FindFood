const mongoose = require('mongoose');

const { DIETARY_INFO, AVAILABILITY, AVAILABILITY_DEFAULT } = require('../utils/constants');

const { Schema } = mongoose;

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    dietaryInfo: {
      type: [String],
      required: true,
      enum: DIETARY_INFO,
    },
    availability: {
      days: {
        type: [String],
        enum: AVAILABILITY,
        required: true,
        default: AVAILABILITY_DEFAULT,
      },
      startTime: {
        type: String,
        required: true,
        default: '10:00',
      },
      endTime: {
        type: String,
        required: true,
        default: '22:00',
      },
    },
    rating: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: boolean,
      required: true,
      default: true,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    ],
    images: [
      {
        publicId: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
