import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const id = event?.context?.params?.id
    return await prisma.category.findUniqueOrThrow({
        where: { id },
        include: { children: true, products: true }
    })
})