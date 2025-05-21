<script setup lang="ts">
import AuthForm from "~/components/AuthForm.vue";
import { useAuthStore } from "~/stores/auth";
import { z } from "zod";
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";

const auth = useAuthStore();
const route = useRoute();

const usePassword = ref(true);
function toggleMode() {
  usePassword.value = !usePassword.value;
}

// Validation Zod locale
const schema = z.object({ email: z.string().email() });
const passSchema = z.object({ password: z.string().min(8) });

async function onLogin({
  email,
  password,
}: {
  email: string;
  password?: string;
}) {
  // si password fourni → login classique
  if (password) {
    const passRes = passSchema.safeParse({ password });
    if (!passRes.success) {
      auth.error = passRes.error.issues.map((i) => i.message).join(", ");
      toast({
        description: auth.error,
        title: "Erreur",
        type: "error",
        duration: 3000,
      });
      return;
    }
    await auth.login(email, password);
    if (!auth.error) {
      const returnTo = (route.query.returnTo as string) || "/";
      navigateTo(decodeURIComponent(returnTo));
    }
  } else {
    // magic link
    const res = schema.safeParse({ email });
    if (!res.success) {
      auth.error = res.error.issues.map((i) => i.message).join(", ");
      return;
    }
    await auth.magicLink(email);
    if (!auth.error)
      toast({
        description: "Magic link envoyé! Vérifiez votre email.",
        title: "Magic link envoyé!",
        type: "success",
        duration: 3000,
      });
  }
}
</script>

<template>
  <AuthForm
    title="Connexion"
    :button-label="usePassword ? 'Connexion' : 'Envoyer un magic link'"
    :loading="auth.isLoading"
    :error="auth.error"
    :use-password="usePassword"
    @submit="onLogin"
  >
    <template #footer>
      <NuxtLink to="/register" class="underline"
        >Pas encore de compte ? Créez-en un</NuxtLink
      >
    </template>
    <template #magic>
      <Button @click.prevent="toggleMode" variant="outline">
        {{
          usePassword
            ? "Utiliser un magic link"
            : "Se connecter par mot de passe"
        }}
      </Button>
    </template>
  </AuthForm>
</template>
