import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { create } from "domain";

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

  messages: defineTable({
    userId: v.string(),
    meessages: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
