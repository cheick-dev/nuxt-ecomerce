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

const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errors = ref<{ password?: string; confirmPassword?: string }>({});

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

async function updatePassword() {
  errors.value = {};
  const result = schema.safeParse({
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  if (!result.success) {
    result.error.issues.forEach((i) => (errors.value[i.path[0]] = i.message));
    return;
  }

  loading.value = true;
  const { error } = await useSupabaseClient().auth.updateUser({
    password: password.value,
  });
  loading.value = false;

  if (error) {
    console.log(error.message);
    return;
  }

  useNuxtApp().$toast.success("Mot de passe mis à jour avec succès");
  await navigateTo("/login");
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <Card class="w-sm">
      <CardHeader>
        <CardTitle>Mise à jour du mot de passe</CardTitle>
        <CardDescription> Entrez votre nouveau mot de passe </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="updatePassword" class="grid gap-4">
          <div class="grid gap-2">
            <Label for="password">Nouveau mot de passe</Label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
            />
            <p v-if="errors.password" class="text-sm text-red-500">
              {{ errors.password }}
            </p>
          </div>
          <div class="grid gap-2">
            <Label for="confirmPassword">Confirmer le mot de passe</Label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
            />
            <p v-if="errors.confirmPassword" class="text-sm text-red-500">
              {{ errors.confirmPassword }}
            </p>
          </div>
          <Button type="submit" class="w-full" :disabled="loading">
            <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
            Mettre à jour le mot de passe
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
