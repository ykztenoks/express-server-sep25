const Post = require("../models/post.model.js")

module.exports = async function isOwner(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)

    if (String(post.owner) !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "Unauthorized" })
  }
}
