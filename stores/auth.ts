import { defineStore } from 'pinia'
// import { useSupabaseClient, useSupabaseUser } from '#supabase'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function login(email: string, password: string) {
        isLoading.value = true
        error.value = null
        const { data, error: e } = await supabase.auth.signInWithPassword({ email, password })
        isLoading.value = false
        if (e) error.value = e.message
        return data
    }

    async function register(email: string, password: string) {
        isLoading.value = true
        error.value = null
        const { data, error: e } = await supabase.auth.signUp({ email, password })
        isLoading.value = false
        if (e) error.value = e.message
        return data
    }

    async function magicLink(email: string) {
        isLoading.value = true
        error.value = null
        const { error: e } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: `${window.location.origin}/confirm` }
        })
        isLoading.value = false
        if (e) error.value = e.message
    }

    async function logout() {
        await supabase.auth.signOut()
    }

    return { user, isLoading, error, login, register, magicLink, logout }
})