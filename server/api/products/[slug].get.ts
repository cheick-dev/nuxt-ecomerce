import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const slug = event?.context?.params?.slug;
  return await prisma.product.findUniqueOrThrow({
    where: { slug },
    include: { images: true, category: true },
  });
});
