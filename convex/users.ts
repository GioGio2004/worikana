import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createUser = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        name: v.string(),
        profileImage: v.string(),
        createdAt: v.number()
    },
    handler: async (ctx, args) => {
        try {
            const newUser = await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.name,
                profileImage: args.profileImage,
                createdAt: Date.now()
            })
            return newUser
        } catch (error) {
            throw new Error("user already exists insert failed")
        }
    }
})