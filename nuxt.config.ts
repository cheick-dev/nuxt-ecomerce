import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },
    modules: ["shadcn-nuxt", "@nuxtjs/supabase", '@pinia/nuxt',
        // "@prisma/nuxt"
    ],
    css: ["~/assets/css/tailwind.css"],
    vite: {
        plugins: [tailwindcss()],
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            include: undefined,
            exclude: [
                '/confirm',
                '/register',
                '/login',
                'update-password',
            ],
            saveRedirectToCookie: false,
        }
    },
    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_ANON_KEY,
        }
    }
});