// import { defineEventHandler, readBody } from 'h3'
// import { serverSupabaseUser } from '#supabase/server'
// import { OrderItem } from '~/types'

// export default defineEventHandler(async (event) => {
//     const nuxtApp = event.context.nuxtApp
//     const prisma = nuxtApp.$prisma
//     const user = await serverSupabaseUser(event)
//     if (!user?.id) throw createError({ statusCode: 401 })
//     const { items, address, paymentInfo } = await readBody(event)
//     // calcul total côté serveur
//     const total = items.reduce((sum: number, i: any) => sum + i.quantity * i.unitPrice, 0)
//     const order = await prisma.order.create({
//         data: {
//             userId: user.id,
//             total,
//             items: {
//                 create: items.map((i: OrderItem) => ({
//                     productId: i.productId,
//                     quantity: i.quantity,
//                     unitPrice: i.unitPrice
//                 }))
//             }
//         },
//         include: { items: true }
//     })
//     return order
// })