<script setup lang="ts">
import type { Product } from "~/types";
const {
  data: products,
  pending,
  error,
} = await useFetch<Product[]>("/api/products");
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="border rounded-xl p-4 shadow-sm hover:shadow transition"
    >
      <img
        v-if="product.images?.[0]"
        :src="product.images[0].url"
        alt="Product image"
        class="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 class="text-lg font-semibold">{{ product.name }}</h3>
      <p class="text-sm text-gray-600">{{ product.price.toFixed(2) }} €</p>
      <NuxtLink
        :to="`/product/${product.slug}`"
        class="text-sm text-blue-500 mt-2 block"
        >Voir</NuxtLink
      >
    </div>
  </div>
</template>
