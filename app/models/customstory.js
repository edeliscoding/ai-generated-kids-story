import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  id: String,
  url: String,
  prompt: String,
  createdAt: { type: Date, default: Date.now },
});

const customStorySchema = new mongoose.Schema({
  title: {
    type: String,
    // required: [true, "Title is required"],
    trim: true,
    // maxLength: [100, "Title cannot be more than 100 characters"],
  },

  content: {
    type: String,
    // required: [true, "Content is required"],
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: [true, "Author is required"],
  },

  // Store generated images in the gallery
  gallery: [imageSchema],

  // Additional metadata
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },

  lastSaved: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Optional fields that might be useful
  description: {
    type: String,
    // maxLength: [500, "Description cannot be more than 500 characters"],
  },

  tags: [
    {
      type: String,
      trim: true,
    },
  ],

  isPublic: {
    type: Boolean,
    default: false,
  },

  // Track version history (optional)
  version: {
    type: Number,
    default: 1,
  },
});
// Add indexes for better query performance
// customStorySchema.index({ author: 1, createdAt: -1 });
// customStorySchema.index({ status: 1, isPublic: 1 });

// // Add a method to save a new version
// customStorySchema.methods.saveVersion = function () {
//   this.version += 1;
//   return this.save();
// };

const CustomStory =
  mongoose.models.CustomStory ||
  mongoose.model("CustomStory", customStorySchema);

export default CustomStory;
