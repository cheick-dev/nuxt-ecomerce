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

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const email = ref("");
const password = ref("");
const errors = ref<{ email?: string; password?: string }>({});
const loading = ref(false);

const supabase = useSupabaseClient();

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
const schema = z.object({
  email: z.string().email("Adresse e‑mail invalide"),
  password: z.string().min(8, "Au moins 8 caractères"),
  // .regex(/[A-Z]/, "1 majuscule minimum")
  // .regex(/[0-9]/, "1 chiffre minimum"),
});

async function register() {
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
  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    password: result.data.password,
    options: { emailRedirectTo: `${window.location.origin}/confirm` },
  });
  loading.value = false;

  if (error) return useNuxtApp().$toast.error(error.message);

  //   useNuxtApp().$toast.success("Compte créé ! Vérifiez votre e‑mail.");
  await navigateTo("/");
}
</script>

<template>
  <Card class="mx-auto w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">Créer un compte</CardTitle>
      <CardDescription>C’est rapide et gratuit.</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="register" class="grid gap-4">
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
          <Label for="password">Mot de passe</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
          />
          <p v-if="errors.password" class="text-sm text-red-500">
            {{ errors.password }}
          </p>
          <p class="text-xs text-muted-foreground">
            Au moins 8 caractères, 1 majuscule, 1 chiffre.
          </p>
        </div>

        <!-- Register -->
        <Button
          type="submit"
          class="w-full flex items-center justify-center"
          :disabled="loading"
        >
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          S’inscrire
        </Button>

        <!-- Link to login -->
        <div class="mt-4 text-center text-sm">
          Déjà inscrit&nbsp;?
          <NuxtLink to="/login" class="underline">Connectez‑vous</NuxtLink>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
