<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingCart } from "lucide-vue-next";
const auth = useAuthStore();
const isLoggingOut = ref(false);

const user = computed(() => auth.user);
// const displayName = computed(() => {
//   const meta = user.value?.user_metadata;
//   if (!meta?.full_name) return "";
//   return meta.full_name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// });

async function handleLogout() {
  isLoggingOut.value = true;
  await auth.logout();
  isLoggingOut.value = false;
  navigateTo("/login");
}

const cart = useCartStore();
const showCart = ref(false);
</script>

<template>
  <header class="w-full bg-white shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold">Mon E-commerce</NuxtLink>

      <div class="flex items-center space-x-6" v-if="user">
        <!-- <NuxtLink to="#" class="hover:text-gray-600 flex items-center gap-2">
          <ShoppingCart class="w-6 h-6" />
          Panier</NuxtLink
        > -->
        <Button @click="showCart = true" class="relative">
          <ShoppingCart class="w-6 h-6" />
          <span
            v-if="cart.count > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cart.count }}
          </span>
        </Button>

        <p class="text-sm">{{ user.email }}</p>

        <!-- Logout via store -->
        <Button
          variant="outline"
          size="sm"
          :disabled="isLoggingOut"
          @click="handleLogout"
        >
          <LogOut class="w-4 h-4" />
        </Button>
      </div>

      <template v-else>
        <NuxtLink to="/login" class="hover:text-gray-600">Connexion</NuxtLink>
        <NuxtLink to="/register" class="hover:text-gray-600"
          >Inscription</NuxtLink
        >
      </template>
    </nav>
  </header>
  <PanierModal v-model:open="showCart" />
</template>
