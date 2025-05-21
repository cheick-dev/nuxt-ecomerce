<script setup lang="ts">
import { useCatalogStore } from "~/stores/catalog";
import { Upload } from "lucide-vue-next";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

const catalog = useCatalogStore();
const supabase = useSupabaseClient();

// Champs du produit
const name = ref("");
const slug = ref("");
const price = ref("");
const description = ref("");
const categoryId = ref("");

// Fichiers et aperçu
const files = ref<File[]>([]);
const previewUrls = ref<string[]>([]);
const uploading = ref(false);

// Charger les catégories
onMounted(() => {
  catalog.fetchCategories();
});

// Mise à jour des fichiers sélectionnés
function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  files.value = Array.from(target.files);
  previewUrls.value = files.value.map((file) => URL.createObjectURL(file));
}

const reset = () => {
  name.value = "";
  slug.value = "";
  price.value = "";
  description.value = "";
  categoryId.value = "";
  files.value = [];
  previewUrls.value = [];
  uploading.value = false;
};

// Création du produit avec upload
async function create() {
  if (!name.value || !slug.value || !price.value || !categoryId.value) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  uploading.value = true;
  const imageUrls: string[] = [];

  for (const file of files.value) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("products-images")
      .upload(fileName, file);

    if (error) {
      console.error("Erreur upload :", error);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from("products-images")
      .getPublicUrl(data.path);

    if (urlData?.publicUrl) {
      imageUrls.push(urlData.publicUrl);
    }
  }

  try {
    await $fetch("/api/admin/products", {
      method: "POST",
      body: {
        name: name.value,
        slug: slug.value,
        price: Number(price.value),
        description: description.value,
        categoryId: categoryId.value,
        images: imageUrls,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la création :", error);
  } finally {
    reset();
    await catalog.fetchProducts();
  }
}
</script>

<template>
  <div>
    <Card class="mx-auto w-md max-w-lg">
      <CardHeader>
        <CardTitle>Admin : produits</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="create" class="grid grid-cols-2 gap-4 mb-6">
          <Input v-model="name" placeholder="Nom" required />
          <Input v-model="slug" placeholder="Slug" required />
          <Input v-model="price" type="number" placeholder="Prix" required />
          <select v-model="categoryId" class="border rounded px-2 py-1">
            <option value="" disabled>Catégorie</option>
            <option
              v-for="cat in catalog.categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
          <Textarea
            v-model="description"
            placeholder="Description"
            class="col-span-2"
          />

          <!-- Upload Images -->
          <div class="col-span-2">
            <Label
              for="file"
              class="mb-2 border border-dashed rounded p-2 min-h-24 text-center cursor-pointer hover:border-gray-400 text-gray-500 w-full flex items-center justify-center flex-col"
            >
              <div
                v-if="previewUrls.length"
                class="flex gap-2 mt-4 flex-wrap justify-center"
              >
                <img
                  v-for="(url, index) in previewUrls"
                  :key="index"
                  :src="url"
                  alt="Preview"
                  class="w-24 h-24 object-cover rounded border"
                />
              </div>

              <div v-else>
                <p class="text-sm flex items-center justify-center mb-3">
                  <Upload
                    class="w-6 h-6 mr-2"
                    :class="{ 'animate-pulse': uploading }"
                  />
                  Cliquez ici pour sélectionner des images
                </p>
                <span>Formats autorisés : SVG, PNG, JPG, JPEG, GIF</span>
              </div>
            </Label>
            <Input
              id="file"
              type="file"
              multiple
              accept="image/*"
              class="hidden"
              @change="onFileChange"
            />
          </div>

          <Button type="submit" class="col-span-2" :disabled="uploading">
            {{ uploading ? "Chargement…" : "Créer le produit" }}
          </Button>
        </form>
      </CardContent>
    </Card>

    <!-- Liste des produits -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <div v-for="p in catalog.products" :key="p.id" class="border rounded p-4">
        <img
          v-if="p.images?.[0]"
          :src="p.images[0].url"
          alt="Produit"
          class="h-24 w-full object-cover rounded mb-2"
        />
        <h2 class="font-semibold">{{ p.name }}</h2>
        <p class="text-sm">{{ p.price.toFixed(2) }}€</p>
      </div>
    </div>
  </div>
</template>
