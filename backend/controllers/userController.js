const User = require('../models/User');

// Get all users with pagination, filtering, and searching

// const getAllUsers = async (req, res) => {
//     try {
//       console.log("HI from backend");
  
//       // Extract pagination parameters from query
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 20;
//       const skip = (page - 1) * limit;
  
//       // Fetch users with pagination
//       const users = await User.find()
//         .skip(skip)
//         .limit(limit)
//         .exec();
  
//       // Get the total count of users to calculate totalPages
//       const totalUsers = await User.countDocuments().exec();
//       const totalPages = Math.ceil(totalUsers / limit);
  
//       // Respond with users and pagination information
//       res.json({
//         users,
//         totalPages,
//         currentPage: page,
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

// const getAllUsers = async (req, res) => {
//     try {
//       console.log("HI from backend");
  
//       // Extract pagination and search parameters from query
//       const page = parseInt(req.query.page) || 1;
//       const limit = parseInt(req.query.limit) || 20;
//       const skip = (page - 1) * limit;
//       const searchQuery = req.query.query || '';
  
//       // Build search filter
//       const searchFilter = searchQuery
//         ? {
//             $or: [
//               { first_name: { $regex: searchQuery, $options: 'i' } },
//               { last_name: { $regex: searchQuery, $options: 'i' } }
//             ]
//           }
//         : {};
  
//       // Fetch users with pagination and search filter
//       const users = await User.find(searchFilter)
//         .skip(skip)
//         .limit(limit)
//         .exec();
  
//       // Get the total count of users to calculate totalPages
//       const totalUsers = await User.countDocuments(searchFilter).exec();
//       const totalPages = Math.ceil(totalUsers / limit);
  
//       // Respond with users and pagination information
//       res.json({
//         users,
//         totalPages,
//         currentPage: page,
//       });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
 
const getAllUsers = async (req, res) => {
    try {
      console.log("HI from backend");
  
      // Extract pagination, search, and filter parameters from query
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const skip = (page - 1) * limit;
      const searchQuery = req.query.query || '';
      const domain = req.query.domain || '';
      const gender = req.query.gender || '';
      const available = req.query.available !== undefined ? req.query.available === 'true' : null;
  
      // Build search filter
      const searchFilter = {
        ...(searchQuery && {
          $or: [
            { first_name: { $regex: searchQuery, $options: 'i' } },
            { last_name: { $regex: searchQuery, $options: 'i' } }
          ]
        }),
        ...(domain && { domain }),
        ...(gender && { gender }),
        ...(available !== null && { available }),
      };
  
      // Fetch users with pagination and filters
      const users = await User.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .exec();
  
      // Get the total count of users to calculate totalPages
      const totalUsers = await User.countDocuments(searchFilter).exec();
      const totalPages = Math.ceil(totalUsers / limit);
  
      // Respond with users and pagination information
      res.json({
        users,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update a user
const updateUser = async (req, res) => {
  try {

    // Convert the id from the request parameters to a number (if necessary)
    const userId = parseInt(req.params.id, 10);

    // Use findOneAndUpdate to target the custom 'id' field
    const updatedUser = await User.findOneAndUpdate({ id: userId }, req.body, { new: true });
   // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
};
