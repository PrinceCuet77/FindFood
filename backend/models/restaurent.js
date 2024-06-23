const mongoose = require('mongoose');

const { Schema } = mongoose;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    price_range: {
      type: String,
      enum: ['affordable', 'mid-range', 'fine dining'],
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      // state: {
      //   type: String,
      //   required: true,
      // },
      // postalCode: {
      //   type: String,
      //   required: true,
      // },
      // country: {
      //   type: String,
      //   required: true,
      // },
    },
    // location: {
    //   latitude: {
    //     type: Number,
    //     required: true,
    //   },
    //   longitude: {
    //     type: Number,
    //     required: true,
    //   },
    // },
    dietary_preferences: {
      type: [String],
      enum: ['vegetarian', 'vegan', 'gluten-free', 'keto', 'halal', 'kosher'],
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ambiance: {
      type: String,
      enum: ['casual', 'cozy', 'upscale', 'family-friendly', 'romantic'],
      required: true,
    },
    special_features: {
      type: [String],
      enum: [
        'outdoor seating',
        'live music',
        'pet-friendly',
        'happy hour specials',
      ],
      required: true,
    },
    hours: {
      monday: {
        type: String,
      },
      tuesday: {
        type: String,
      },
      wednesday: {
        type: String,
      },
      thursday: {
        type: String,
      },
      friday: {
        type: String,
      },
      saturday: {
        type: String,
      },
      sunday: {
        type: String,
      },
    },
    contact: {
      phone: {
        type: String,
        required: true,
      },
      website: {
        type: String,
        required: true,
      },
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
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    Menus: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: 'Menu',
          required: true,
        },
      },
    ],
    images: [
      {
        public_id: {
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

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
