import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const id = event?.context?.params?.id
    await prisma.category.delete({ where: { id } })
    return { success: true }
})