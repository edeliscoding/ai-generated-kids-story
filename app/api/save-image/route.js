// import { storage } from "@/app/config/firebase";
// import axios from "axios";
// import {
//   getDownloadURL,
//   ref,
//   getStorage,
//   uploadString,
// } from "firebase/storage";
// import { NextRequest, NextResponse } from "next/server";
// // import { getStorage, ref, uploadString } from "firebase/storage";

// export async function POST(request) {
//   const data = await request.json();
//   const { url } = data;

//   //   const convertbase64 = await convertImage(url);
//   const base64Image = "data:image/png;base64," + (await convertImage(url));

//   const fileName = "/childrens-story/" + Date.now() + ".png";
//   const imageRef = ref(storage, fileName);
//   await uploadString(imageRef, base64Image, "base64").then((snapshot) => {
//     console.log("Image uploaded");
//   });

//   const downloadUrl = await getDownloadURL(imageRef);

//   console.log("from save-image downloadUrl", downloadUrl);
//   return NextResponse.json({ imageUrl: downloadUrl });
// }

// export const convertImage = async (imageUrl) => {
//   try {
//     const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
//     const base64Image = Buffer.from(response.data).toString("base64");
//     return base64Image;
//   } catch (error) {
//     console.error(error);
//   }
// };
import { storage } from "@/app/config/firebase";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const { url } = data;

  const base64Image = await convertImage(url);
  const fileName = "/childrens-story/" + Date.now() + ".png";
  const imageRef = ref(storage, fileName);

  await uploadString(imageRef, base64Image, "base64");
  // console.log("Image uploaded");

  const downloadUrl = await getDownloadURL(imageRef);
  // console.log("from save-image downloadUrl", downloadUrl);
  return NextResponse.json({ imageUrl: downloadUrl });
}

export const convertImage = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
