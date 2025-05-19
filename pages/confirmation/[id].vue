<script setup lang="ts">
const route = useRoute();
const supabase = useSupabaseClient();

onMounted(async () => {
  try {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: route.params.id as string,
      type: "email",
    });

    if (error) throw error;

    // Redirection vers le dashboard après confirmation réussie
    await navigateTo("/dashboard");
  } catch (error: any) {
    useNuxtApp().$toast.error(
      error.message || "Erreur lors de la confirmation"
    );
    await navigateTo("/login");
  }
});
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Confirmation en cours</CardTitle>
        <CardDescription>
          Veuillez patienter pendant que nous confirmons votre email...
        </CardDescription>
      </CardHeader>
      <CardContent class="flex justify-center">
        <Loader2 class="h-8 w-8 animate-spin" />
      </CardContent>
    </Card>
  </div>
</template>
