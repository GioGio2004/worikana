import { query } from "./_generated/server";

export const getLastMessage = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("messages")
      .order("desc")
      .first();
  },
});