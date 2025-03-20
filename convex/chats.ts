// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const create = mutation({
//   args: {
//     userId: v.string(),
//     title: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const now = Date.now();
    
//     const chatId = await ctx.db.insert("chats", {
//       userId: args.userId,
//       title: args.title,
//       createdAt: now,
//       updatedAt: now,
//     });
    
//     return chatId;
//   },
// });

// export const list = query({
//   args: {
//     userId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const chats = await ctx.db
//       .query("chats")
//       .withIndex("by_user", (q) => q.eq("userId", args.userId))
//       .order("desc")
//       .collect();
    
//     return chats.map((chat) => ({
//       id: chat._id,
//       title: chat.title,
//     }));
//   },
// });

// // export const get = query({
// //   args: {
// //     chatId: v.string(),
// //   },
// //   handler: async (ctx, args) => {
// //     const chat = await ctx.db.get(args.chatId);
// //     if (!chat) {
// //       return null;
// //     }
    
// //     return {
// //       id: chat._id,
// //       title: chat.title,
// //       userId: chat.userId,
// //     };
// //   },
// // });