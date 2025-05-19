<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Loader2 } from "lucide-vue-next";

definePageMeta({ layout: "auth" });

const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});
const loading = ref(false); // ← état du loader

const supabase = useSupabaseClient();

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(8, "Au moins 8 caractères"),
});

async function signIn() {
  errors.value = {};
  const result = schema.safeParse({
    email: email.value,
    password: password.value,
  });
  if (!result.success) {
    result.error.issues.forEach((i) => (errors.value[i.path[0]] = i.message));
    return;
  }

  loading.value = true;
  const { error } = await supabase.auth.signInWithPassword(result.data);
  loading.value = false;

  if (error) return useNuxtApp().$toast.error(error.message);

  // Récupère l'URL de redirection depuis les paramètres de l'URL
  const route = useRoute();
  const returnTo = route.query.returnTo as string;

  // Redirige vers la page demandée ou la page d'accueil par défaut
  await navigateTo(decodeURIComponent(returnTo || "/"));
}

async function magicLink() {
  if (!email.value) return useNuxtApp().$toast.error("Entrez votre email");
  loading.value = true;
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: { emailRedirectTo: `${window.location.origin}/confirm` },
  });
  loading.value = false;

  if (error) return useNuxtApp().$toast.error(error.message);
  useNuxtApp().$toast.success("Lien magique envoyé !");
}
</script>

<template>
  <Card class="mx-auto w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">Connexion</CardTitle>
      <CardDescription>Entrez vos identifiants.</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="signIn" class="grid gap-4">
        <!-- Email -->
        <div class="grid gap-2">
          <Label for="email">E‑mail</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="m@example.com"
          />
          <p v-if="errors.email" class="text-sm text-red-500">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Mot de passe</Label>
            <NuxtLink to="/reset" class="ml-auto text-sm underline"
              >Mot de passe oublié ?</NuxtLink
            >
          </div>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
          />
          <p v-if="errors.password" class="text-sm text-red-500">
            {{ errors.password }}
          </p>
        </div>

        <!-- Connexion -->
        <Button
          type="submit"
          class="w-full flex items-center justify-center"
          :disabled="loading"
        >
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Connexion
        </Button>

        <!-- Lien magique -->
        <Button
          variant="outline"
          type="button"
          class="w-full flex items-center justify-center"
          @click="magicLink"
          :disabled="loading"
        >
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          Recevoir un lien magique
        </Button>
      </form>

      <div class="mt-4 text-center text-sm">
        Pas encore de compte ?
        <NuxtLink to="/register" class="underline">Inscrivez-vous</NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
