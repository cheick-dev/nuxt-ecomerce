import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  return await prisma.category.findMany({
    include: { children: true },
  });
});
