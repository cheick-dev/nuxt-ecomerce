<script setup lang="ts">
// import type { Product } from "~/lib/generated/prisma";
import { useCatalogStore } from "~/stores/catalog";
import type { Product } from "~/types";
const catalogStore = useCatalogStore();
onMounted(() => catalogStore.fetchProducts());

const selectedProduct = ref(null);
const showModal = ref(false);

function openModal(product: any) {
  selectedProduct.value = product;
  showModal.value = true;
}
</script>

<template>
  <div>
    <h1 class="text-3xl mb-6 text-center font-bold">Nos produits</h1>
    <div
      v-if="catalogStore.loading"
      class="text-center animate-pulse h-screen flex items-center justify-center"
    >
      Chargement…
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <ProductCard
        v-for="product in catalogStore.products"
        :key="product.id"
        :name="product.name"
        :price="product.price"
        :imageUrl="product?.images?.[0]?.url || ''"
        :category="product.category?.name"
        @open-modal="openModal(product)"
      />

      <ProductModal
        v-if="selectedProduct"
        v-model:open="showModal"
        :product="selectedProduct"
      />
    </div>
  </div>
</template>
