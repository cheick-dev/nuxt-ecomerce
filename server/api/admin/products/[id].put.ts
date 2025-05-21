import { PrismaClient } from '~/lib/generated/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

    const id = event?.context?.params?.id
    const data = await readBody(event)
    return prisma.product.update({ where: { id }, data })
})