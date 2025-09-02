const { Schema, model } = require("mongoose")

const postSchema = new Schema({
  title: { type: String, required: true },
  post: { type: String, required: true },
  owner: { type: Schema.ObjectId, ref: "User" },
})

module.exports = model("Post", postSchema)
