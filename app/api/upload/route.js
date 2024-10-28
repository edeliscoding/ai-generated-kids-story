import mongoose from "mongoose";
import mongoDb from "@/app/lib/mongodb";
import Story from "@/app/models/story";
import { storage } from "@/app/config/firebase";

import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

// import fs from "fs";
// import path from "path";

// // Ensure `uploads` directory exists
// const uploadsDir = path.join(process.cwd(), "public", "uploads");
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }
export async function POST(request) {
  try {
    const data = await request.json();
    const { base64Image } = data;
    console.log("first base64", base64Image);

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const cleanedBase64Image = base64Image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const fileName = "/story-editor/" + Date.now() + ".png";
    const imageRef = ref(storage, fileName);

    // Upload base64 image string directly
    await uploadString(imageRef, cleanedBase64Image, "base64");

    // Get the download URL of the uploaded image
    const downloadUrl = await getDownloadURL(imageRef);
    return NextResponse.json({ imageUrl: downloadUrl });
  } catch (error) {
    console.error("Error in POST /api/upload:", error);
    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
