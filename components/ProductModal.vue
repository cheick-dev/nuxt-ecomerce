<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-vue-next";
import { useCartStore } from "~/stores/cart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const props = defineProps<{
  open: boolean;
  product: {
    id: string;
    name: string;
    price: number;
    description?: string;
    images: { url: string }[];
    category?: { name: string };
  };
}>();

const emit = defineEmits(["update:open"]);

const cart = useCartStore();
const internalOpen = ref(props.open);

watch(
  () => props.open,
  (value) => {
    internalOpen.value = value;
  }
);
watch(internalOpen, (value) => {
  emit("update:open", value);
});

function addToCart() {
  cart.addToCart({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    imageUrl: props.product.images[0]?.url || "",
    quantity: 1,
  });
  internalOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="internalOpen">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">
          {{ product.name }}
        </DialogTitle>
      </DialogHeader>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Image -->
        <Carousel class="w-full mx-auto">
          <CarouselContent>
            <CarouselItem
              v-for="(image, index) in product.images"
              :key="index"
              class="basis-full"
            >
              <img
                :src="image.url"
                alt="Product image"
                class="w-full rounded-xl"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <!-- Infos produit -->
        <div class="space-y-3">
          <p class="text-xl font-semibold text-primary">
            {{ product.price.toFixed(2) }} €
          </p>

          <Badge variant="secondary" v-if="product.category">
            {{ product.category.name }}
          </Badge>

          <p class="text-muted-foreground text-sm leading-relaxed">
            {{ product.description || "Aucune description disponible." }}
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button @click="addToCart" class="gap-2">
          <ShoppingCart class="w-4 h-4" />
          Ajouter au panier
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
