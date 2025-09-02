const router = require("express").Router()
const Post = require("../models/post.model.js")
const User = require("../models/user.model.js")
const isAuth = require("../middleware/auth.middleware.js")
const isOwner = require("../middleware/isOwner.js")

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()

    return res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const post = await Post.findById(id)
    return res.status(200).json(post)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.post("/", isAuth, async (req, res) => {
  try {
    const { title, post } = req.body

    const created = await Post.create({ title, post, owner: req.user._id })

    return res.status(201).json(created)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.patch("/:id", isAuth, isOwner, async (req, res) => {
  try {
    const { id } = req.params
    const { title, post } = req.body
    const allowed = { title, post }

    for (key in allowed) {
      if (!allowed[key]) {
        delete allowed[key]
      }
    }

    const updated = await Post.findByIdAndUpdate(id, allowed)

    return res.status(200).json(updated)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.delete("/:id", isAuth, isOwner, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Post.findByIdAndDelete(id)

    return res.status(200).json({ message: "deleted succesfuly" })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

module.exports = router
