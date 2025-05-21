<template>
  <Card class="mx-auto w-sm">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription v-if="error" class="text-red-500">
        {{ error }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="submit" class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div v-if="usePassword" class="grid gap-2">
          <Label for="password">Mot de passe</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="********"
            required
          />
        </div>
        <Button
          :disabled="loading"
          class="w-full flex items-center justify-center"
        >
          <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
          {{ buttonLabel }}
        </Button>
      </form>

      <div class="mt-4 flex justify-between flex-col text-sm gap-4 text-center">
        <slot name="magic" class="w-full"></slot>
        <slot name="footer"></slot>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-vue-next";

const props = defineProps({
  title: String,
  buttonLabel: String,
  loading: Boolean,
  error: String,
  usePassword: { type: Boolean, default: true },
});

const emit = defineEmits<{
  (e: "submit", payload: { email: string; password?: string }): void;
}>();

const email = ref("");
const password = ref("");

function submit() {
  emit("submit", {
    email: email.value,
    password: props.usePassword ? password.value : undefined,
  });
}
</script>
