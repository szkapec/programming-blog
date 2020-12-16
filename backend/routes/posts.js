const express = require('express')
const router = express.Router();
const Post = require('../schemas/Post');
const authentication = require('../middleware/authentication');
const User = require('../schemas/User')
const { check, validationResult } = require('express-validator')


router.get('/posts', async (req,res) => {
    try {
        let posts = await Post.find()
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})

router.get('/posts/most_liked', async (req,res) => {
    try {
        let posts = await Post.find().sort({likes: -1})
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})
router.get('/posts/the_most_commented', async (req,res) => {
    try {
        let posts = await Post.find().sort({comments: -1})
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})
router.get('/posts/the_most_recent', async (req,res) => {
    try {
        let posts = await Post.find().sort({data: 1})
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})


router.get('/single_post/:post_id', async (req,res) => {
    try {
        let posts = await Post.findById(req.params.post_id)
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})
router.get('/user_posts/:user_id', async (req,res) => {
    try {
        let posts = await Post.find({user: req.params.user_id})
        console.log(posts)
        res.json(posts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})
router.get('/user_posts', authentication, async (req,res) => {
    try {
        let posts = await Post.find();
        let userPosts = posts.filter(post => post.user.toString() === req.user.id.toString())
        res.json(userPosts)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
});

router.post('/add', authentication, 
[
    check("textOfThePost", "Text is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty()
],
 async (req,res) => {
    let { textOfThePost, title, image } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        let user = await User.findById(req.user.id).select('-password');
        await console.log(user)
        if(!user) return res.status(400).json("User is not found")

        let newPost = new Post({
            textOfThePost,
            title,
            image,
            name: user.name, 
            avatar: user.avatar,
            user: req.user.id,
            lastName: user.lastName,
            userName: Math.random(),
        })
        await newPost.save();
        res.json("Post is created")
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})

router.put('/search_for_post', 
    [check("searchInput", "Search is empty").not().isEmpty()],
   
    async (req,res) => {
       
        const { searchInput } = req.body;
        console.log(searchInput)
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });
        try {
          let posts = await Post.find();
          if (searchInput === "" || searchInput === null) {
            res.status(401).json(posts);
          } else {
            const findPostBySearchInput = posts.filter(
              (post) =>
                post.textOfThePost.toString().toLowerCase().split(" ").join("") ===
                searchInput.toString().toLowerCase().split(" ").join("")
            );
            res.json(findPostBySearchInput);
          }
            
        } catch (error) {
            console.error(error)
            return res.status(500).json("Server Error...")
        }
    })


router.put("/likes/:post_id", authentication, async (req,res) => {
    // console.log(req.params.post_id) // id postu
    // console.log(req.params.post_id) // id postu
    try {
        let post = await Post.findById(req.params.post_id)
        console.log(post) // wyszukaj posty o tym id
        if(!post) return res.status(404).json("Post not found");
        
        if(post.likes.find(like => like.user.toString() === req.user.id)) {
            return res.status(401).json("Post is already liked by you!");
        }
        
        let newLike = { user: req.user.id}; 

        post.likes.unshift(newLike);
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})


router.put('/add_comment/:post_id' , authentication, [check("textOfTheComment", "Text is empty").not().isEmpty()],  async (req,res) => {
    const {textOfTheComment} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    try {
        let post = await Post.findById(req.params.post_id);
        let user = await User.findById(req.user.id).select('-password');
        console.log(user)
        if(!user) return res.status(404).json("User not found");
        if(!post) return res.status(404).json("Post not found");

        let newComment = {
            textOfTheComment,
            name: user.name,
            avatar: user.avatar,
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})
router.put(
    "/like_comment/:post_id/:comment_id", authentication, async (req, res) => {
        try {
            let post = await Post.findById(req.params.post_id);
            if(!post) return res.status(404).json("post not found");

            const commentFromPost = post.comments.find(comment => comment._id.toString() === req.params.comment_id.toString())

            if(!commentFromPost) return res.status(404).json("Comment not found");

            const newLike = {
                user: req.user.id,
            }
            commentFromPost.likes.unshift(newLike);
            await post.save();
            res.json("Comment is liked");

        } catch (error) {
                console.error(error)
                return res.status(500).json("Server Error...")
        }
    }
)

router.delete('/detele_post/:post_id', authentication, async (req,res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if(!post) return res.status(404).json('Post not found')
        if(post.user.toString() !== req.user.id.toString()) return res.status(401).json('Ypu are not allowed to do that!');
        await post.remove();
        res.json("Post is remove")
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})

router.delete('/remove_like_from_post/:post_id/:like_id', authentication, async(req,res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if(!post) return res.status(404).json("Post not found");
        
        const removeLike =  post.likes.filter(like=> like.id.toString() !== req.params.like_id.toString())
        post.likes = removeLike;
        await post.save();
        res.json(post)
    } catch (error) {
        
    }
})

router.delete('/remove_comment/:post_id/:comment_id' , authentication, async(req,res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if(!post) return res.status(404).json("Post not found");
        const removeComment = post.comments.filter(comment => comment._id.toString() !== req.params.comment_id)
        post.comments = removeComment;
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})


router.delete('/remove_like_from_comment/:post_id/:comment_id/:like_id' , authentication, async(req,res) => {
    try {
        let post = await Post.findById(req.params.post_id);
        if(!post) return res.status(404).json("Post not found");
        
        const comment = post.comments.find(comment => comment._id.toString() === req.params.comment_id)

        const removeLikeFromComment = comment.likes.filter(like => like.id.toString() !== req.params.like_id.toString());

        comment.likes = removeLikeFromComment;
        await post.save();
        res.json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json("Server Error...")
    }
})

module.exports = router;
