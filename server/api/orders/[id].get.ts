// import { PrismaClient } from '~/lib/generated/prisma'
// import { serverSupabaseUser } from '#supabase/server'

// const prisma = new PrismaClient()


// export default defineEventHandler(async (event) => {
//     const user = await serverSupabaseUser(event)

//     // const nuxtApp = event.context.nuxtApp
//     // const prisma = nuxtApp.$prisma
//     const id = event?.context?.params?.id
//     if (!user?.id) throw createError({ statusCode: 401 })
//     return prisma.order.findFirstOrThrow({
//         where: { id, userId: user.id },
//         include: { items: { include: { product: true } } }
//     })
// })