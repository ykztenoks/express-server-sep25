const { Schema, model } = require("mongoose")

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    post: { type: String, required: true, trim: true },
    owner: { type: Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Post", postSchema)
