<script setup lang="ts">
import { onMounted } from "vue";
import { useCatalogStore } from "~/stores/catalog";
import type { Product } from "~/types";

const catalog = useCatalogStore();

onMounted(() => {
  catalog.fetchProducts();
});
</script>

<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl mb-6">Nos produits</h1>
    <div v-if="catalog.loading" class="text-center">Chargement…</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="p in catalog.products"
        :key="p.id"
        class="border rounded-lg p-4 hover:shadow"
      >
        <img
          v-if="p.images?.[0]"
          :src="p.images[0].url"
          alt=""
          class="h-40 w-full object-cover rounded"
        />
        <h2 class="text-xl font-semibold mt-2">{{ p.name }}</h2>
        <p class="text-gray-700">{{ p.price.toFixed(2) }} €</p>
        <NuxtLink
          :to="`/product/${p.slug}`"
          class="text-blue-600 hover:underline mt-2 block"
          >Voir le détail</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
