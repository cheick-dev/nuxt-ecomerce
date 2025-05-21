import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    return await prisma.product.findMany({
        include: { images: true, category: true }
    })
})
