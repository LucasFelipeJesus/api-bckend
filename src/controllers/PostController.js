import Post from "../models/Post.js"

const PostController = {
    create: async (req, res) => {
        try {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                professional: req.body.professional,
            })
            const newPost = await post.save()
            res.status(201).json(newPost)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getall: async (req, res) => {
        try {
            const posts = await Post.find()
            res.json(posts)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getOne: async (req, res) => {
        try {
            const id = req.params.id
            const post = await Post.findById(id)
            if (post == null) {
                return res.status(404).json({ message: "Post not found" })
            }
            res.json(post)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const post = await Post.findById(id)
            if (post == null) {
                return res.status(404).json({ message: "Post not found" })
            }
            const deletedPost = await Post.findByIdAndDelete(id)
            res.status(200).json({
                deletedPost,
                message: "Post deleted",
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
}

export default PostController
