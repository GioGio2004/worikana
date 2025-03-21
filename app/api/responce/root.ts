import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextRequest, NextResponse } from "next/server";

// because useQuery i ment for only react components we
// have to use the ConvexHttpClient to fetch the data

// Load Convex API URL from .env.local
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    // Fetch messages from Convex
    const message = await convex.query(api.messages.getLastMessage);
    
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
