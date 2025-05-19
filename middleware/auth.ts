// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()
    const client = useSupabaseClient()

    // Liste des pages publiques
    const publicPages = [
        '/login',
        '/register',
        '/confirm',
        '/reset',
        '/update-password',
        '/confirmation'
    ]

    // Vérifie si la route actuelle est une sous-route d'une page publique
    const isPublicRoute = publicPages.some(page => to.path.startsWith(page))

    // Si l'utilisateur n'est pas connecté et que la page n'est pas publique
    if (!user.value && !isPublicRoute) {
        // Stocke la route actuelle pour y rediriger après la connexion
        const returnTo = encodeURIComponent(to.fullPath)
        return navigateTo(`/login?returnTo=${returnTo}`)
    }

    // Si l'utilisateur est connecté et essaie d'accéder à une page de connexion
    if (user.value && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/')
    }
})
