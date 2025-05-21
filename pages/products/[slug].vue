<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "#imports";
import { useCatalogStore } from "~/stores/catalog";
import { useCartStore } from "~/stores/cart";
import type { Product } from "~/types";

const route = useRoute();
const slug = route.params.slug as string;
const catalog = useCatalogStore();
const cart = useCartStore();

const product = ref<Product | null>(null);
const qty = ref(1);

onMounted(async () => {
  product.value = await catalog.fetchProductBySlug(slug);
});
</script>

<template>
  <div v-if="!product" class="text-center py-10">Chargement…</div>
  <div v-else class="container mx-auto py-8 grid md:grid-cols-2 gap-8">
    <img
      v-if="product.images?.[0]"
      :src="product.images[0].url"
      alt=""
      class="w-full h-80 object-cover rounded-lg"
    />
    <div>
      <h1 class="text-3xl font-bold">{{ product.name }}</h1>
      <p class="text-gray-700 mt-2">{{ product.description }}</p>
      <p class="text-2xl font-semibold mt-4">
        {{ product.price.toFixed(2) }} €
      </p>
      <div class="flex items-center space-x-2 mt-4">
        <Input type="number" v-model.number="qty" min="1" class="w-20" />
        <Button @click="cart.add(product, qty)">Ajouter au panier</Button>
      </div>
    </div>
  </div>
</template>
