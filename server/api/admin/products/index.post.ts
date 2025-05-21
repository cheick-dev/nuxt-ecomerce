import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  const payload = await readBody(event);

  return prisma.product.create({
    data: {
      name: payload.name,
      slug: payload.slug,
      price: payload.price,
      description: payload.description,
      categoryId: payload.categoryId,
      images: {
        create: payload.images?.map((url: string) => ({ url })),
      },
    },
  });
});
