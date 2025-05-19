<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<template>
  <div>
    <main
      class="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center"
    >
      <slot />
    </main>
  </div>
</template>
