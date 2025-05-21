<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { ShoppingCart, Eye, ShoppingBag } from "lucide-vue-next";

defineProps<{
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
}>();

const emit = defineEmits<{
  (e: "open-modal"): void;
}>();
</script>

<template>
  <Card
    class="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
  >
    <CardHeader class="p-0">
      <AspectRatio :ratio="4 / 3" class="bg-muted">
        <img
          :src="imageUrl"
          alt="Product image"
          class="w-full h-full object-cover"
        />
      </AspectRatio>
    </CardHeader>
    <CardContent class="p-4">
      <div class="flex items-center justify-between mb-1">
        <h3 class="text-lg font-semibold text-foreground truncate">
          {{ name }}
        </h3>
        <Badge variant="secondary" v-if="category">{{ category }}</Badge>
      </div>
      <p class="text-xl font-bold text-primary">{{ price.toFixed(2) }} €</p>
    </CardContent>
    <CardFooter class="p-4 pt-0">
      <Button
        variant="default"
        class="w-full flex items-center justify-center gap-2"
        @click="emit('open-modal')"
      >
        <ShoppingBag class="w-4 h-4" />
        Voir le produit
      </Button>
    </CardFooter>
  </Card>
</template>
