<!-- components/CartModal.vue -->
<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="w-full max-w-md p-4">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <ShoppingCart class="w-8 h-8" />
          Mon panier
        </DialogTitle>
        <DialogDescription>
          Vous avez {{ cart.count }} produit(s) dans votre panier.
        </DialogDescription>
      </DialogHeader>

      <div v-if="cart.count === 0" class="text-center text-gray-500">
        Panier vide.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex items-center justify-between gap-4 border-b pb-2"
        >
          <img
            :src="item.imageUrl"
            alt="img"
            class="w-12 h-12 rounded object-cover"
          />
          <div class="flex-1">
            <h4 class="font-medium text-sm">{{ item.name }}</h4>
            <p class="text-xs text-muted-foreground">
              {{ item.quantity }} × {{ item.price.toFixed(2) }} €
            </p>
          </div>
          <Button variant="ghost" size="icon" @click="cart.removeItem(item.id)">
            <Minus class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" @click="cart.removeItem(item.id)">
            <Plus class="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" @click="cart.removeItem(item.id)">
            <X class="w-4 h-4" />
          </Button>
        </div>

        <div class="text-right font-semibold mt-4">
          Total : {{ cart.total.toFixed(2) }} €
        </div>
        <Button class="w-full" variant="default" @click="checkout">
          Commander
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { X, ShoppingCart, Plus, Minus } from "lucide-vue-next";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["update:open"]);

const cart = useCartStore();

function checkout() {
  alert("Merci pour votre commande !");
  cart.clearCart();
  emit("update:open", false);
}
</script>
