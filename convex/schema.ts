import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    profileImage: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_name", ["name"])
    .index("by_email", ["email"]),

    // messages: defineTable({
    //   userId: v.id("users"),
    //   content: v.string(),
    //   role: v.string(), // "user" or "assistant"
    //   timestamp: v.string(),
    // }).index("by_chatId", ["userId"]),

    // conversations: defineTable({
    //   userId: v.id("users"),
    // }).index("by_userId", ["userId"]),
});
