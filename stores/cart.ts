// stores/cart.ts
import { defineStore } from "pinia";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    count: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    total: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product: CartItem) {
      const existing = this.items.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(productId: string) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    clearCart() {
      this.items = [];
    },
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});
