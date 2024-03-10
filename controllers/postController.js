import Post from '../models/postModel.js';

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
  
    const userId = req.user.id; 
    const newPost = new Post({ content, userId });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { content } = req.body;

    //find post
     const post = await Post.findById(req.params.id); 

    //check post exists or not
     if(!post){
       return res.status(404).json({ success: false, error: 'Post not found' });
     }

     //update post
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { content }, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
     
    //find post
     const post = await Post.findById(req.params.id); 

    //check post exists or not
     if(!post){
       return res.status(404).json({ success: false, error: 'Post not found' });
     }

    //delete post
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
