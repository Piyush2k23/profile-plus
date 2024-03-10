import Follow from '../models/followModel';

export const followUser = async (req, res) => {
  try {
    const followerId = req.userId; // Assuming userId is extracted from JWT token
    const { userId } = req.params;
    const existingFollow = await Follow.findOne({ followerId, followingId: userId });
    if (existingFollow) {
      return res.status(400).json({ error: 'You are already following this user' });
    }
    const newFollow = new Follow({ followerId, followingId: userId });
    await newFollow.save();
    res.status(201).json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.userId; // Assuming userId is extracted from JWT token
    const { userId } = req.params;
    const deletedFollow = await Follow.findOneAndDelete({ followerId, followingId: userId });
    if (!deletedFollow) {
      return res.status(404).json({ error: 'You are not following this user' });
    }
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const followerId = req.userId; // Assuming userId is extracted from JWT token
    const following = await Follow.find({ followerId }).populate('followingId', 'username');
    res.status(200).json(following.map(follow => follow.followingId));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follow.find({ followingId: userId }).populate('followerId', 'username');
    res.status(200).json(followers.map(follow => follow.followerId));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
