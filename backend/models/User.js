const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },  
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  avatar: { type: String, required: true },
  domain: { type: String, required: true },
  available: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);  // Model name: 'User'

module.exports = User;
