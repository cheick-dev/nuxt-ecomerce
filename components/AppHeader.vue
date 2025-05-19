<template>
  <header class="w-full bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-bold">Mon E-commerce</NuxtLink>
        <div class="flex items-center space-x-4">
          <NuxtLink to="/products" class="hover:text-gray-600"
            >Produits</NuxtLink
          >
          <NuxtLink to="/cart" class="hover:text-gray-600">Panier</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>
