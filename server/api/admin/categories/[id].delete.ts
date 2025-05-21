import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  await prisma.category.delete({ where: { id } });
  return { success: true };
});
