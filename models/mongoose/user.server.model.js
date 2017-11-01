const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required:[true, 'name is required'],
    maxLength: [50, 'name is too long'],
  },
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, 'please enter a valid email'],
    trim: true,
    required:[true, 'email is required'],
    maxLength: [100, 'email is too long'],
  },
  address: {
    type: String,
    required:[true, 'address is required'],
    maxLength: [50, 'address is too long'],
  },
  country: {
    type: String,
    required:[true, 'country is required'],
    maxLength: [20, 'country is too long'],
  },
  department: {
    type: String,
    required:[true, 'department is required'],
    maxLength: [20, 'department is too long']
  },
  city: {
    type: String,
    required:[true, 'city is required'],
    maxLength: [20, 'city is too long']
  },
  mobile: {
    type: String,
    required:[true, 'mobile number is required'],
    maxLength: [50, 'mobile is too long'],
  },
  phone: {
    type: String,
    maxLength: [50, 'phone is too long'],
  },
  validated: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required:[true, 'password is required',],
    minLength: [8, 'Password is too short'],
    maxLength: [50, 'Password is too long'],
  },
  salt: {
    type: String
  },
  providerId: {
    type: String,
    required:[true, 'providerId is required']
  },
  created: {
    type: Date,
    default: Date.now
  },
  rol: {
    type: String,
    default: 'user'
  }
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64').toString('base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('base64');
};

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

mongoose.model('User', UserSchema);
