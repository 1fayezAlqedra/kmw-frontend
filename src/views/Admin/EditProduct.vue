<template>
  <div class="p-10 bg-[#F7F4EE] min-h-screen text-left select-none" dir="ltr">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 class="text-[28px] font-black text-[#091124] tracking-tight uppercase">EDIT PRODUCT</h1>
        <p class="text-[13px] font-bold text-[#788FA6] mt-1">Modify details and update images for active stone item #{{ productId }}</p>
      </div>
      <router-link
        to="/admin/products"
        class="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-white hover:bg-[#F7F4EE] text-[#091124] px-5 py-2.5 rounded-full font-black text-[11px] tracking-wider border border-[#E6E1DA] shadow-xs uppercase transition-all"
      >
        ← BACK TO DASHBOARD
      </router-link>
    </div>

    <div v-if="isLoading" class="max-w-6xl mx-auto text-center py-20 text-[#788FA6] font-bold">
      Loading product details...
    </div>

    <div v-else class="max-w-6xl mx-auto bg-white rounded-[1.75rem] border border-[#ECE6DD] p-10 shadow-xs">
      <form @submit.prevent="handleSubmit" class="space-y-8">

        <!-- Product Names -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">PRODUCT NAME</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px]"
            />
          </div>

          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">اسم المنتج</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <input
              type="text"
              v-model="form.name_ar"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all text-[13.5px] text-right"
            />
          </div>
        </div>

        <!-- Product Category -->
        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider">
            <span class="text-[#788FA6] uppercase">PRODUCT CATEGORY</span>
            <span class="text-[#A1461D] ml-1 uppercase">(ASSIGN MAIN BELONGING)</span>
          </label>
          <div class="relative">
            <select
              v-model="form.category_id"
              required
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-bold focus:outline-none focus:border-[#A1461D] transition-all cursor-pointer text-[13.5px] appearance-none"
            >
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name_en }} — {{ cat.name_ar }}
              </option>
            </select>
            <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#788FA6] pointer-events-none text-xs">▼</span>
          </div>
        </div>

        <!-- Descriptions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-2.5">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#788FA6] uppercase">DESCRIPTION</span>
              <span class="text-[#A1461D] ml-1 uppercase">(ENGLISH)</span>
            </label>
            <textarea
              v-model="form.description_en"
              required
              rows="5"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed"
            ></textarea>
          </div>

          <div class="flex flex-col gap-2.5 text-right" dir="rtl">
            <label class="text-[11px] font-black tracking-wider">
              <span class="text-[#A1461D] uppercase">الوصف</span>
              <span class="text-[#788FA6] mr-1 uppercase">(باللغة العربية)</span>
            </label>
            <textarea
              v-model="form.description_ar"
              required
              rows="5"
              class="w-full px-5 py-4 rounded-xl border border-[#E6E1DA] bg-[#FDFDFD] text-[#2C3E50] font-semibold focus:outline-none focus:border-[#A1461D] transition-all resize-none text-[13.5px] leading-relaxed text-right"
            ></textarea>
          </div>
        </div>

        <!-- Image Management -->
        <div class="flex flex-col gap-2.5">
          <label class="text-[11px] font-black tracking-wider text-[#788FA6] uppercase">MANAGE PRODUCT IMAGES</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col items-center justify-center w-full h-36 border-2 border-[#E6E1DA] border-dashed rounded-xl cursor-pointer bg-[#FDFDFD] hover:bg-[#F7F4EE] transition-colors">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <span class="text-2xl mb-1">📸</span>
                <p class="text-xs font-bold text-[#788FA6]">Click or drag to add more images to this product gallery</p>
              </div>
              <input type="file" class="hidden" multiple accept="image/*" @change="handleImageUpload" />
            </label>
          </div>

          <div v-if="imagePreviews.length > 0" class="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-2">
            <div v-for="(src, index) in imagePreviews" :key="index" class="relative rounded-xl overflow-hidden border border-[#E6E1DA] bg-white aspect-square shadow-xs group">
              <img :src="src.url" class="w-full h-full object-cover" />

              <button
                type="button"
                @click="setAsMain(index)"
                :class="src.is_main ? 'bg-[#A1461D] text-white' : 'bg-slate-900/60 text-slate-200 opacity-0 group-hover:opacity-100'"
                class="absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded shadow-xs transition-opacity uppercase tracking-wider"
              >
                {{ src.is_main ? 'MAIN' : 'SET AS MAIN' }}
              </button>

              <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-black rounded-xl uppercase">Remove</button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end pt-5 border-t border-[#ECE6DD]">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-8 py-3.5 rounded-xl bg-[#091124] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
          >
            {{ isSubmitting ? 'UPDATING...' : 'UPDATE PRODUCT' }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const productId = ref(route.params.id)

const categories = ref([])
const isLoading = ref(true)
const isSubmitting = ref(false)

const form = ref({
  category_id: '',
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  images: [] // New uploaded File objects
})

// Combined previews (both existing DB images and newly added local files)
const imagePreviews = ref([])

// 🔑 Helper to add Bearer Token to Headers
const getAuthHeaders = (isMultipart = false) => {
  const token = localStorage.getItem('token') || localStorage.getItem('access_token')
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    ...(isMultipart && { 'Content-Type': 'multipart/form-data' })
  }
}

// Fetch categories and product data on mount
onMounted(async () => {
  try {
    const [categoriesRes, productRes] = await Promise.all([
      axios.get('http://127.0.0.1:8000/api/v1/categories', { headers: getAuthHeaders() }),
      axios.get(`http://127.0.0.1:8000/api/v1/products/${productId.value}`, { headers: getAuthHeaders() })
    ])

    categories.value = categoriesRes.data?.data || categoriesRes.data || []

    const prod = productRes.data?.data || productRes.data
    form.value.category_id = prod.category_id
    form.value.name_ar = prod.name_ar
    form.value.name_en = prod.name_en
    form.value.description_ar = prod.description_ar
    form.value.description_en = prod.description_en

    // Load existing images into previews
    if (prod.images && prod.images.length > 0) {
      imagePreviews.value = prod.images.map(img => ({
        id: img.id,
        url: img.image_url || `http://127.0.0.1:8000/storage/${img.image_path}`,
        is_main: Boolean(img.is_main),
        isExisting: true
      }))
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.response?.status === 401) {
      alert('Your session has expired. Please log in again.')
    }
  } finally {
    isLoading.value = false
  }
})

const setAsMain = (index) => {
  imagePreviews.value.forEach((img, idx) => {
    img.is_main = idx === index
  })
}

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    form.value.images.push(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push({
        url: e.target.result,
        is_main: imagePreviews.value.length === 0, // set main if first image
        isExisting: false,
        fileRef: file
      })
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Handle removing a single image
 * Communicates with backend endpoint DELETE api/v1/product-images/{id} if existing
 */
const removeImage = async (index) => {
  const target = imagePreviews.value[index]

  // Case 1: Image exists in the database -> Send API request to delete
  if (target.isExisting && target.id) {
    if (!confirm('Are you sure you want to permanently delete this image from the server?')) return

    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/product-images/${target.id}`, {
        headers: getAuthHeaders()
      })

      // Remove from preview array upon successful API response
      imagePreviews.value.splice(index, 1)
    } catch (error) {
      console.error('Failed to delete image:', error.response?.data || error)
      if (error.response?.status === 401) {
        alert('Unauthenticated (401). Token missing or expired.')
      } else {
        alert(error.response?.data?.message || 'Failed to delete image from server.')
      }
    }
  }
  // Case 2: Newly uploaded file in local browser state
  else {
    if (target.fileRef) {
      const fileIdx = form.value.images.indexOf(target.fileRef)
      if (fileIdx > -1) form.value.images.splice(fileIdx, 1)
    }
    imagePreviews.value.splice(index, 1)
  }
}

const handleSubmit = async () => {
  isSubmitting.value = true

  const formData = new FormData()
  // Trick Laravel to accept multipart form-data for PUT requests
  formData.append('_method', 'PUT')

  formData.append('category_id', form.value.category_id)
  formData.append('name_en', form.value.name_en)
  formData.append('name_ar', form.value.name_ar)
  formData.append('description_en', form.value.description_en)
  formData.append('description_ar', form.value.description_ar)

  // Pass new uploaded images
  form.value.images.forEach((file, index) => {
    formData.append(`new_images[${index}]`, file)
  })

  // Send layout state for main image
  const mainImageIndex = imagePreviews.value.findIndex(img => img.is_main)
  formData.append('main_image_index', mainImageIndex !== -1 ? mainImageIndex : 0)

  try {
    await axios.post(`http://127.0.0.1:8000/api/v1/products/${productId.value}`, formData, {
      headers: getAuthHeaders(true)
    })

    router.push('/admin/products')
  } catch (error) {
    console.error('Failed to update product:', error.response?.data || error)
    if (error.response?.status === 401) {
      alert('Unauthenticated (401). Token missing or expired.')
    } else {
      alert(error.response?.data?.message || 'Failed to update product.')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
