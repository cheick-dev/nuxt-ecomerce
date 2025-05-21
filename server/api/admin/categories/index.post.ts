import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const { name, slug, parentId } = await readBody(event);
  return prisma.category.create({ data: { name, slug, parentId } });
});
