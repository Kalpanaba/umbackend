const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  //name: { type: String, required: true },
  //users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  users: [{
    id: { type: Number, required: true, unique: true },  
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    avatar: { type: String, required: true },
    domain: { type: String, required: true },
    available: { type: Boolean, default: true }
}
],
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
