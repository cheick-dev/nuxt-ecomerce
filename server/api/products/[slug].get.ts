import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

    const slug = event?.context?.params?.slug
    return await prisma.product.findUniqueOrThrow({
        where: { slug },
        include: { images: true, category: true }
    })
})