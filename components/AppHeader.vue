<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const user = useSupabaseUser();
onMounted(async () => {
  console.log(user);
});
</script>

<template>
  <header class="w-full bg-white shadow-sm sticky top-0">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold">Mon E-commerce</NuxtLink>
        <div class="flex items-center space-x-4" v-if="user">
          <NuxtLink to="#" class="hover:text-gray-600">Produits</NuxtLink>
          <NuxtLink to="#" class="hover:text-gray-600">Panier</NuxtLink>
          <p>{{ user.email }}</p>
        </div>
        <div class="flex items-center space-x-4" v-else>
          <NuxtLink to="/login" class="hover:text-gray-600">Connexion</NuxtLink>
          <NuxtLink to="/register" class="hover:text-gray-600"
            >Inscription</NuxtLink
          >
        </div>

        <!-- <Avatar>
          <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar> -->
      </div>
    </nav>
  </header>
</template>
