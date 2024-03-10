import Follow from '../models/followModel.js';
import User from '../models/userModel.js';


export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; 
    const userId = req.params.id;
   
    const existingFollow = await Follow.findOne({ followerId, followingId: userId });

    //check if user already follow
    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    //follow user
    const newFollow = new Follow({ followerId, followingId: userId });
    await newFollow.save();

    // Update the user's followers array
    await User.findByIdAndUpdate(userId, { $push: { followers: followerId } });

    // Update the follower's following array
    await User.findByIdAndUpdate(followerId, { $push: { following: userId } });

    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id; 
    const userId = req.params.id;
   
    const deletedFollow = await Follow.findOneAndDelete({ followerId, followingId: userId });
    if (!deletedFollow) {
      return res.status(404).json({ error: 'You are not following this user' });
    }

     // Remove the userId from the following array of the follower user
     await User.findByIdAndUpdate(followerId, { $pull: { following: userId } });
     
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const followerId = req.user.id; 
    const following = await Follow.find({ followerId }).populate('followingId', 'username');
    res.status(200).json(following.map(follow => follow.followingId));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await Follow.find({ followingId: userId }).populate('followerId', 'username');
    res.status(200).json(followers.map(follow => follow.followerId));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
