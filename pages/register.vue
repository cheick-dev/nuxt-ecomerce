<script setup lang="ts">
import AuthForm from "~/components/AuthForm.vue";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue-sonner";

import { z } from "zod";

const auth = useAuthStore();

// Validation Zod locale
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

async function onRegister({
  email,
  password,
}: {
  email: string;
  password?: string;
}) {
  const res = schema.safeParse({ email, password });
  if (!res.success) {
    auth.error = res.error.issues.map((i) => i.message).join(", ");
    toast({
      description: auth.error,
      title: "Erreur",
      type: "error",
      duration: 3000,
    });
    return;
  }

  await auth.register(email, password!);
  if (!auth.error) {
    auth.error = null;
    toast({
      description: "Compte créé ! Vérifiez votre email.",
      title: "Succès",
      type: "success",
      duration: 3000,
    });
    navigateTo("/login");
  }
}
</script>

<template>
  <AuthForm
    title="Créer un compte"
    button-label="S’inscrire"
    :loading="auth.isLoading"
    :error="auth.error"
    @submit="onRegister"
  >
    <template #footer>
      Déjà inscrit ?
      <NuxtLink to="/login" class="underline">Connexion</NuxtLink>
    </template>
  </AuthForm>
</template>
