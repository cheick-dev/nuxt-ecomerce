<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
const cart = useCartStore();
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl mb-6">Votre panier</h1>
    <div v-if="!cart.items.length" class="text-center">Le panier est vide.</div>
    <div v-else class="space-y-4">
      <div
        v-for="item in cart.items"
        :key="item.product.id"
        class="flex items-center justify-between border p-4 rounded-lg"
      >
        <div>
          <h2 class="font-semibold">{{ item.product.name }}</h2>
          <p class="text-gray-600">
            {{ item.product.price.toFixed(2) }} € × {{ item.quantity }}
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          @click="cart.remove(item.product.id)"
        >
          ×
        </Button>
      </div>
      <div class="text-right font-bold text-xl">
        Total :
        {{
          cart.items
            .reduce((sum, i) => sum + i.product.price * i.quantity, 0)
            .toFixed(2)
        }} €
      </div>
      <NuxtLink to="/checkout">
        <Button>Passer à la validation</Button>
      </NuxtLink>
    </div>
  </div>
</template>
