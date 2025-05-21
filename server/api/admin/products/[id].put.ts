import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const id = event?.context?.params?.id;
  const data = await readBody(event);
  return prisma.product.update({ where: { id }, data });
});
