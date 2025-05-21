import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

    const { category, search, skip = '0', take = '20' } = getQuery(event)
    const where: any = {}
    if (category) where.categoryId = category
    if (search) where.name = { contains: String(search), mode: 'insensitive' }
    return await prisma.product.findMany({
        where,
        skip: parseInt(String(skip)),
        take: parseInt(String(take)),
        include: { images: true, category: true }
    })
})