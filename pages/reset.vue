<script setup lang="ts">
definePageMeta({ layout: "auth" });
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

const email = ref("");
const loading = ref(false);
const errors = ref<{ email?: string }>({});

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
});

async function resetPassword() {
  errors.value = {};
  const result = schema.safeParse({ email: email.value });
  console.log(result);

  if (!result.success) {
    result.error.issues.forEach((i) => (errors.value[i.path[0]] = i.message));
    return;
  }

  loading.value = true;
  const { error } = await useSupabaseClient().auth.resetPasswordForEmail(
    email.value,
    {
      redirectTo: `${window.location.origin}/update-password`,
    }
  );
  loading.value = false;

  if (error) {
    console.log(error);

    return;
  }

  console.log("Instructions envoyées par email");
  await navigateTo("/login");
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Réinitialisation du mot de passe</CardTitle>
        <CardDescription>
          Entrez votre email pour recevoir les instructions de réinitialisation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="resetPassword" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            <p v-if="errors.email" class="text-sm text-red-500">
              {{ errors.email }}
            </p>
          </div>
          <Button type="submit" class="w-full" :disabled="loading">
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            Envoyer les instructions
          </Button>
          <NuxtLink to="/login" class="text-center text-sm underline">
            Retour à la connexion
          </NuxtLink>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
