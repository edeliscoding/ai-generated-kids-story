import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    storyTitle: String,
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
StorySchema.index({ storyTitle: "text", storySubject: "text" });

const Story = mongoose.models.Story || mongoose.model("Story", StorySchema);
Story.createIndexes();

export default Story;
