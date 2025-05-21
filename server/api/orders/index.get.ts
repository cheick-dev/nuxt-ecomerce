// import { defineEventHandler } from 'h3'
// import { serverSupabaseUser } from '#supabase/server'
// export default defineEventHandler(async (event) => {
//     const nuxtApp = event.context.nuxtApp
//     const prisma = nuxtApp.$prisma
//     const user = await serverSupabaseUser(event)
//     if (!user?.id) throw createError({ statusCode: 401 })
//     return prisma.order.findMany({
//         where: { userId: user.id },
//         include: { items: true }
//     })
// })