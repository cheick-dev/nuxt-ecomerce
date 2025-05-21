import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { name, slug, parentId } = await readBody(event)
    return prisma.category.create({ data: { name, slug, parentId } })
})