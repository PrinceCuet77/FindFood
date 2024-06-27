exports.USER_TYPE = ['user', 'admin'];
exports.GENDER_TYPE = ['male', 'female'];

exports.PRICE_RANGE = ['affordable', 'mid-range', 'fine dining'];
exports.DIETARY_PREFERENCES = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'keto',
  'halal',
  'kosher',
];
exports.AMBIANCE = ['casual', 'cozy', 'upscale', 'family-friendly', 'romantic'];
exports.SPECIAL_FEATURES = [
  'outdoor seating',
  'live music',
  'pet-friendly',
  'happy hour specials',
];

exports.STATUS = [
  'pending',
  'confirmed',
  'preparing',
  'delivered',
  'cancelled',
];

exports.DIETARY_INFO = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'keto',
  'halal',
  'kosher',
];
exports.AVAILABILITY = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
exports.AVAILABILITY_DEFAULT = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
];

exports.SORT_OPTIONS = {
  newest: '-createdAt',
  oldest: 'createdAt',
  'a-z': 'name',
  'z-a': '-name',
  'price-asc': 'price',
  'price-desc': '-price',
  'rating-asc': 'rating',
  'rating-desc': '-rating',
};

exports.DESCENDING_OPTIONS = {
  Z_TO_A: 'z-a',
  PRICE_DESC: 'price-desc',
  RATING_DESC: 'rating-desc',
};