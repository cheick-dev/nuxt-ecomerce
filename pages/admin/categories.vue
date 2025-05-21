<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCatalogStore } from "~/stores/catalog";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const catalog = useCatalogStore();
const name = ref("");
const slug = ref("");
const parentId = ref<string | null>(null);
const isLoading = ref(false);
const errors = ref<{ [key: string]: string }>({});

const categorySchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  slug: z
    .string()
    .min(2, "Le slug doit contenir au moins 2 caractères")
    .regex(
      /^[a-z0-9-]+$/,
      "Le slug ne doit contenir que des lettres minuscules, des chiffres et des tirets"
    ),
  parentId: z.string().nullable(),
});

onMounted(() => catalog.fetchCategories());

async function create() {
  try {
    isLoading.value = true;
    const validatedData = categorySchema.parse({
      name: name.value,
      slug: slug.value,
      parentId: parentId.value,
    });

    const { error } = await useFetch("/api/admin/categories", {
      method: "POST",
      body: validatedData,
    });

    if (error.value) {
      errors.value = {
        submit: "Une erreur est survenue lors de la création de la catégorie",
      };
      return;
    }

    await catalog.fetchCategories();
    name.value = "";
    slug.value = "";
    parentId.value = null;
    errors.value = {};
  } catch (e) {
    if (e instanceof z.ZodError) {
      errors.value = e.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as { [key: string]: string });
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Card class="mx-auto w-sm">
    <CardHeader>
      <CardTitle class="text-xl"> Admin: catégories </CardTitle>
      <CardDescription v-if="errors.submit" class="text-red-500">
        {{ errors.submit }}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="create" class="flex flex-col space-y-4 mb-6">
        <div>
          <Input
            v-model="name"
            placeholder="Nom"
            :class="{ 'border-red-500': errors.name }"
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{
            errors.name
          }}</span>
        </div>
        <div>
          <Input
            v-model="slug"
            placeholder="Slug"
            :class="{ 'border-red-500': errors.slug }"
          />
          <span v-if="errors.slug" class="text-red-500 text-sm">{{
            errors.slug
          }}</span>
        </div>
        <Button type="submit" :disabled="isLoading">Créer</Button>
      </form>

      <ul>
        <li v-for="c in catalog.categories" :key="c.id" class="py-2 border-b">
          {{ c.name }} — <code>{{ c.slug }}</code>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
