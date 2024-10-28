// app/api/autocomplete/route.js
// import { openai } from "@/app/lib/openai";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY, // This is also the default, can be omitted
});

export async function POST(request) {
  try {
    const { content } = await request.json();
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Complete the following text: ${content}`,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    return new Response(
      JSON.stringify({ suggestion: response.choices[0].text.trim() }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating auto-completion:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate auto-completion" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
