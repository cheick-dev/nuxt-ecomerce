import { defineStore } from "pinia";
import type { Category } from "~/lib/generated/prisma";
import type { Product } from "~/types";

export const useCatalogStore = defineStore("catalog", () => {
  const products = ref<Product[]>([]);
  const categories = ref<Category[]>([]);
  const loading = ref(false);

  async function fetchCategories() {
    loading.value = true;
    const response = await $fetch("/api/categories");
    categories.value = response;
    loading.value = false;
  }

  async function fetchProducts(params: Record<string, any> = {}) {
    loading.value = true;
    const queryString = new URLSearchParams(params).toString();
    const response = await $fetch<Product[]>(`/api/products?${queryString}`);
    console.log(response);
    products.value = response;
    loading.value = false;
  }

  async function fetchProductBySlug(slug: string) {
    loading.value = true;
    const p = await $fetch<Product>(`/api/products/${slug}`);
    loading.value = false;
    return p;
  }

  return {
    products,
    categories,
    loading,
    fetchCategories,
    fetchProducts,
    fetchProductBySlug,
  };
});
