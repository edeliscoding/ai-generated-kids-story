// import { NextRequest, NextResponse } from "next/server";
// import Replicate from "replicate";

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });

// export async function POST(request) {
//   if (!process.env.REPLICATE_API_TOKEN) {
//     throw new Error(
//       "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
//     );
//   }
//   const { prompt } = await request.json();
//   // const input = {
//   //   prompt: prompt,
//   // };
//   // const output = await replicate.run("black-forest-labs/flux-schnell", {
//   //   input,
//   // });

//   const output = await replicate.run("black-forest-labs/flux-schnell", {
//     input: {
//       aspect_ratio: "1:1",
//       disable_safety_checker: false,
//       go_fast: true,
//       num_outputs: 1,
//       output_format: "webp",
//       output_quality: 80,
//       prompt: prompt,
//     },
//   });

//   // return NextResponse.json({ message: "testing output" });
//   return NextResponse.json({ imageUrl: output[0] });
// }
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function pollForImage(prediction) {
  const maxAttempts = 20; // 5 minutes total
  const delayBetweenAttempts = 2000; // 5 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const output = await replicate.predictions.get(prediction.id);

    if (
      output.status === "succeeded" &&
      output.output &&
      output.output[0] &&
      output.output[0].endsWith(".png")
    ) {
      return output.output[0];
    }

    if (output.status === "failed") {
      throw new Error("Image generation failed");
    }

    // Wait before the next attempt
    await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts));
  }

  throw new Error("Timeout: Image generation took too long");
}

export async function POST(request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const { prompt } = await request.json();

  try {
    const prediction = await replicate.predictions.create({
      model: "black-forest-labs/flux-schnell",
      input: {
        aspect_ratio: "1:1",
        disable_safety_checker: false,
        megapixels: "0.25",
        go_fast: true,
        num_outputs: 1,
        output_format: "png", // Changed to PNG
        output_quality: 75,
        prompt: prompt,
      },
    });

    const imageUrl = await pollForImage(prediction);
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
