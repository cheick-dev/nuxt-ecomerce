// import prisma from "~/server/db/client";

// export default defineEventHandler(async (event) => {
//   const { category, search, skip = "0", take = "20" } = getQuery(event);
//   const where: any = {};
//   if (category) where.categoryId = category;
//   if (search) where.name = { contains: String(search), mode: "insensitive" };
//   return await prisma.product.findMany({
//     where,
//     skip: parseInt(String(skip)),
//     take: parseInt(String(take)),
//     include: { images: true, category: true },
//   });
// });

import prisma from "~/server/db/client";

export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.product.findMany({
      include: { images: true, category: true },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return a meaningful error response
    return { error: "Failed to fetch products" };
  }
});
