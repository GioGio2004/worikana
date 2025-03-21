// Importing necessary modules from Next.js and Axios
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

// Define the POST request handler for the API route
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON request body and extract the 'message' field
    const { message }: { message: string } = await req.json(); // Explicitly define type for TypeScript safety

    // Send the user's message to the Hugging Face API for chatbot response
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", // API endpoint
      { inputs: message }, // Sending user's message as input
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` }, // API key for authentication
      }
    );

    console.log("Hugging Face Response:", response.data); // Log API response for debugging

    // Extract the chatbot's response from the API response
    // If response is undefined, return a default error message
    const reply = response.data[0]?.generated_text || "I couldn't process that.";
    console.log("Bot Reply:", reply); // Log the bot's reply for debugging
    // Return the bot's reply as a JSON response
    return NextResponse.json({ reply });
  } catch (error: unknown) {
    // Handle errors from Axios requests
    if (error instanceof AxiosError) {
      console.error("API Error:", error.response?.data || error.message); // Log API-specific errors
    } else {
      console.error("Unexpected Error:", error); // Log any other unexpected errors
    }
    
    // Return a generic error message with a 500 status code
    return NextResponse.json({ reply: "Error processing request." }, { status: 500 });
  }
}
