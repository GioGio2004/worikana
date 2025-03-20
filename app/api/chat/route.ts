import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const { message }: { message: string } = await req.json(); // Explicitly define type

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      { inputs: message },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );

    console.log("Hugging Face Response:", response.data); // Debugging

    const reply = response.data[0]?.generated_text || "I couldn't process that.";
    return NextResponse.json({ reply });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected Error:", error);
    }
    return NextResponse.json({ reply: "Error processing request." }, { status: 500 });
  }
}
