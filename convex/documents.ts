import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const createDocument = mutation({
  args: { title: v.string(), parentDocument: v.optional(v.id("documents")) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const document = await ctx.db.insert("documents", { title: args.title, parentDocument: args.parentDocument, userId: identity.subject, isArchived: false, isPublished: false });
    return document;
  },
});

export const getDocuments = query({
  args: { parentDocument: v.optional(v.id("documents")) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", args.parentDocument))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const archive = mutation({
  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not found");

    const userId = identity.subject;
    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const archivedChildrenDocuments = async (documentId: Id<"documents">) => {
      const archivedDocumentChildren = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => q.eq("userId", userId).eq("parentDocument", documentId))
        .collect();

      for (const child of archivedDocumentChildren) {
        await ctx.db.patch(child._id, { isArchived: true });

        archivedChildrenDocuments(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, { isArchived: true });

    archivedChildrenDocuments(args.id);

    return document;
  },
});

export const getTrashDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not found");

    const userId = identity.subject;
    if (existingDocument.userId !== userId) throw new Error("Unauthorized");

    const removedDocument = await ctx.db.delete(args.id);

    return removedDocument;
  },
});
