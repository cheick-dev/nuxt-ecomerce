
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)
    const user = await serverSupabaseUser(event)
    if (!user) throw createError({ statusCode: 401 })
    const updates = await readBody(event)
    const { data, error } = await supabase.auth.updateUser(updates)
    if (error) throw createError({ statusCode: 400, statusMessage: error.message })
    return data
})