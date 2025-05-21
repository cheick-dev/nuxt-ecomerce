<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();
const name = ref("");
const address = ref("");
const city = ref("");
const postal = ref("");
const error = ref<string | null>(null);

async function onSubmit() {
  if (!name.value || !address.value) {
    error.value = "Veuillez remplir nom et adresse.";
    return;
  }
  await cart.checkout({
    name: name.value,
    address: address.value,
    city: city.value,
    postal: postal.value,
  });
  if (cart.error) error.value = cart.error;
  else navigateTo(`/order/${cart.order?.id}`);
}
</script>

<template>
  <div class="container mx-auto py-8 max-w-md">
    <h1 class="text-3xl mb-6">Validation de la commande</h1>
    <Alert v-if="error" variant="destructive">{{ error }}</Alert>
    <div class="grid gap-4">
      <Input v-model="name" placeholder="Nom complet" />
      <Input v-model="address" placeholder="Adresse" />
      <Input v-model="city" placeholder="Ville" />
      <Input v-model="postal" placeholder="Code postal" />
      <Button :loading="cart.loading" @click="onSubmit">Commander</Button>
    </div>
  </div>
</template>
