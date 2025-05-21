import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  return await prisma.category.findUniqueOrThrow({
    where: { id },
    include: { children: true, products: true },
  });
});
