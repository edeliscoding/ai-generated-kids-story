import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    storySubject: String,
    storyType: String,
    ageGroup: String,
    imageStyle: String,
    output: String,
    coverImage: String,
    author: String,
    userEmail: String,
    userName: String,
    userImage: String,
  },
  { timestamps: true }
);

const Story = mongoose.models.Story || mongoose.model("Story", StorySchema);

export default Story;
