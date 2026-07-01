<template>
  <div class="w-full max-w-4xl mx-auto p-4 sm:p-0 animate-fade-in box-border overflow-hidden">

    <!-- الهيدر العلوي: متجاوب بالكامل -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE3DA] pb-6 mb-8">
      <div>
        <h3 class="text-xl md:text-2xl font-black text-slate-900 tracking-wide uppercase">Edit Stone Classification</h3>
        <p class="text-xs text-slate-400 font-bold mt-1">Modify global translations, slugs, and cover graphics for this category</p>
      </div>
      <RouterLink
        to="/admin/categories"
        class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-[#F7F4F0] text-slate-700 font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest text-center shadow-sm"
      >
        ← Back to Categories
      </RouterLink>
    </div>

    <!-- كرت النموذج (Form) -->
    <div class="bg-white rounded-2xl p-5 sm:p-8 border border-[#EAE3DA] shadow-[0_4px_20px_-4px_rgba(139,92,26,0.05)] w-full box-border">
      <form @submit.prevent="handleSubmit" class="space-y-6">

        <!-- شبكة الأسماء المترجمة -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          <!-- English Title -->
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              Category Name <span class="text-amber-800 font-serif">(English)</span>
            </label>
            <input
              type="text"
              v-model="form.name_en"
              @input="generateSlug"
              required
              placeholder="e.g., Granite, Marble, Quartz"
              class="w-full px-4 py-3.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-slate-900 font-medium transition-all duration-300 text-sm shadow-sm placeholder:text-slate-300"
            />
          </div>

          <!-- Arabic Title -->
          <div class="flex flex-col space-y-2" dir="rtl">
            <label class="text-xs font-black text-amber-900/80 uppercase tracking-wider text-right font-sans flex items-center justify-start gap-1">
              اسم التصنيف <span class="text-slate-400 font-sans">(باللغة العربية)</span>
            </label>
            <input
              type="text"
              v-model="form.name_ar"
              required
              placeholder="مثال: جرانيت، رخام، كوارتز، بورسلان"
              class="w-full px-4 py-3.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-slate-900 font-bold transition-all duration-300 text-sm shadow-sm text-right font-sans placeholder:text-slate-300"
            />
          </div>

        </div>

        <!-- حقل الـ Slug المحمي والمتجاوب -->
        <div class="flex flex-col space-y-2">
          <label class="text-xs font-black text-slate-400 uppercase tracking-wider">
            URL Slug <span class="text-[10px] text-amber-700/70 font-black font-mono">(Protected - Auto Generated)</span>
          </label>
          <div class="relative flex items-center w-full">
            <span class="absolute left-4 text-xs font-bold text-slate-400 select-none font-mono tracking-tight">/category/</span>
            <input
              type="text"
              v-model="form.slug"
              required
              placeholder="granite"
              class="w-full pl-24 pr-4 py-3.5 bg-[#F7F4F0]/60 border border-[#EAE3DA] rounded-xl text-amber-950/80 font-mono text-xs shadow-sm outline-none cursor-not-allowed select-none opacity-80 truncate"
              readonly
            />
          </div>
        </div>

        <!-- شبكة الوصف المترجم -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          <!-- English Description -->
          <div class="flex flex-col space-y-2">
            <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Description (English)</label>
            <textarea
              v-model="form.description_en"
              rows="4"
              placeholder="e.g., Collection of natural durable igneous rocks suitable for heavy-duty countertops and flooring..."
              class="w-full px-4 py-3.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-slate-900 font-medium transition-all duration-300 text-sm shadow-sm resize-none placeholder:text-slate-300 leading-relaxed"
            ></textarea>
          </div>

          <!-- Arabic Description -->
          <div class="flex flex-col space-y-2" dir="rtl">
            <label class="text-xs font-black text-amber-900/80 uppercase tracking-wider text-right font-sans">الوصف (باللغة العربية)</label>
            <textarea
              v-model="form.description_ar"
              rows="4"
              placeholder="مثال: تشكيلة من الصخور الطبيعية الصلبة المقاومة للحرارة والخدش، مثالية للمطابخ والأرضيات الخارجية..."
              class="w-full px-4 py-3.5 bg-[#F7F4F0]/40 border border-[#EAE3DA] rounded-xl focus:outline-none focus:border-amber-950 focus:bg-white text-slate-900 font-medium transition-all duration-300 text-sm shadow-sm resize-none text-right font-sans placeholder:text-slate-300 leading-relaxed"
            ></textarea>
          </div>

        </div>

        <!-- منطقة رفع/تعديل غلاف التصنيف الحالي -->
        <div class="flex flex-col space-y-2">
          <label class="text-xs font-black text-slate-400 uppercase tracking-wider">Category Cover Image</label>

          <div class="border-2 border-dashed border-[#EAE3DA] hover:border-amber-950/40 rounded-2xl p-5 sm:p-6 bg-[#F7F4F0]/20 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer relative min-h-[180px]">

            <div v-if="!imagePreview" class="flex flex-col items-center justify-center p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-300 group-hover:text-amber-950 transition-colors mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-xs sm:text-sm font-black text-slate-800 px-2">Click to upload or drag category image here</p>
              <p class="text-[11px] text-slate-400 font-bold mt-1">Supports PNG, JPG or WEBP up to 5MB</p>
            </div>

            <div v-else class="flex flex-col items-center justify-center space-y-2 py-2 w-full max-w-xs">
              <img :src="imagePreview" alt="Preview" class="max-h-28 object-contain rounded-xl border border-[#EAE3DA] shadow-sm" />
              <p class="text-[11px] sm:text-xs font-black text-amber-950 flex items-center gap-1 min-w-0 w-full justify-center">
                ✓ <span class="underline font-mono truncate px-1">{{ fileName }}</span>
              </p>
            </div>

            <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
        </div>

        <!-- أزرار الإرسال والتحكم السفلية: متجاوبة ومريحة للموبايل -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 border-t border-[#EAE3DA] pt-6 mt-8">
          <RouterLink
            to="/admin/categories"
            class="w-full sm:w-auto order-2 sm:order-1 px-6 py-3.5 bg-white hover:bg-[#F7F4F0] text-slate-700 font-black text-xs rounded-xl border border-[#E2D9CD] transition-all duration-300 uppercase tracking-widest text-center shadow-sm"
          >
            Cancel
          </RouterLink>
          <button
            type="submit"
            class="w-full sm:w-auto order-1 sm:order-2 px-8 py-3.5 bg-amber-950 hover:bg-amber-900 text-white font-black text-xs rounded-xl transition-all duration-300 uppercase tracking-widest shadow-md cursor-pointer text-center"
          >
            Update Category
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = reactive({
  name_en: '',
  name_ar: '',
  description_en: '',
  description_ar: '',
  slug: '',
  image: null
})

const fileName = ref('')
const imagePreview = ref(null)

onMounted(() => {
  const categoryId = route.params.id
  console.log('Fetching analytical data for template ID:', categoryId)

  // ملء البيانات افتراضياً لتبدو الشاشة ممتلئة بالبيانات القديمة وجاهزة فوراً
  form.name_en = 'Marble Collection'
  form.name_ar = 'تشكيلة الرخام الطبيعي'
  form.description_en = 'Metamorphic rocks known for elegant veining, bright textures, and luxury appeal.'
  form.description_ar = 'صخور متحولة مشهورة بعروقها الأنيقة، ملمسها اللامع، وتصاميمها الفاخرة.'
  form.slug = 'marble-collection'

  // إظهار الصورة المخزنة مسبقاً في المعاينة
  imagePreview.value = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400'
  fileName.value = 'current_marble_cover.jpg'
})

const generateSlug = () => {
  form.slug = form.name_en
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.image = file
    fileName.value = file.name
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('name_en', form.name_en)
  formData.append('name_ar', form.name_ar)
  formData.append('description_en', form.description_en)
  formData.append('description_ar', form.description_ar)
  formData.append('slug', form.slug)

  if (form.image) {
    formData.append('image_path', form.image)
  }

  console.log('FormData updated successfully for Laravel:', form)
  alert('Category updated successfully!')
  router.push('/admin/categories')
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
