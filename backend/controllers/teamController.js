const Team = require('../models/Team');
const User = require('../models/User');

const createTeam = async (req, res) => {
  try {
    const { name, userIds } = req.body;

    // Check for unique domains and availability
    const users = await User.find({
      _id: { $in: userIds },
      availability: true,
    });

    const domains = new Set();
    users.forEach(user => {
      if (domains.has(user.domain)) {
        return res.status(400).json({ message: 'Each user must have a unique domain' });
      }
      domains.add(user.domain);
    });

    const team = new Team({ name, users: userIds });
    const savedTeam = await team.save();

    res.status(201).json(savedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('users');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTeam,
  getTeamById,
};
