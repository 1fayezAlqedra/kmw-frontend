<template>
  <div
    class="min-h-screen w-full text-stone-100 flex flex-col justify-between bg-cover bg-center bg-fixed bg-no-repeat relative overflow-x-hidden"
    :style="{ backgroundImage: `url(${sectionbg})` }" :dir="currentLang === 'ar' ? 'rtl' : 'ltr'">

    <div class="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] pointer-events-none"></div>

    <div class="relative z-10 flex flex-col flex-grow justify-between min-h-screen w-full">
      <Navbar />

      <main class="flex-grow py-12 px-4 sm:px-8 lg:px-16 flex items-center justify-center">

        <div class="w-full max-w-5xl relative bg-stone-950/80 backdrop-blur-2xl
                   p-7 sm:p-12 lg:p-16 rounded-[2.5rem]
                   border border-stone-800/80
                   shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                   overflow-hidden bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${oldCardBg})` }">

          <div class="absolute inset-0 bg-stone-950/85 pointer-events-none"></div>
          <div class="absolute -top-32 -left-32 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-32 -right-32 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10">

            <div class="max-w-2xl mb-10 sm:mb-14">
              <span class="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-inner">
                {{ currentLang === 'ar' ? 'تواصل معنا مباشرة' : 'Get In Touch' }}
              </span>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                {{ currentLang === 'ar' ? 'نحن مستعدون دائماً لسماع آرائكم ومقترحاتكم' : 'We Are Always Ready to Hear From You' }}
              </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6 sm:space-y-8" novalidate>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div class="space-y-2.5">
                  <label class="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                    {{ currentLang === 'ar' ? 'الاسم الكامل' : 'Full Name' }}
                    <span class="text-amber-400">*</span>
                  </label>
                  <input type="text" v-model="form.name" required :placeholder="currentLang === 'ar' ? 'أدخل اسمك الكامل هنا...' : 'Enter your full name...'"
                    class="w-full px-5 py-4 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-white text-sm sm:text-base placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-stone-600 transition-all duration-300 shadow-inner" />
                </div>

                <div class="space-y-2.5">
                  <label class="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                    {{ currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address' }}
                    <span class="text-amber-400">*</span>
                  </label>
                  <input type="email" v-model="form.email" required placeholder="name@example.com"
                    class="w-full px-5 py-4 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-white text-sm sm:text-base placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-stone-600 transition-all duration-300 shadow-inner" />
                </div>
              </div>

              <div class="space-y-2.5">
                <label class="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  {{ currentLang === 'ar' ? 'رقم الهاتف' : 'Phone Number' }}
                  <span class="text-amber-400">*</span>
                </label>

                <div class="vue-tel-wrapper-container" dir="ltr">
                  <vue-tel-input
                    :key="currentLang"
                    v-model="form.phone"
                    @input="onPhoneInput"
                    :dropdownOptions="{
                      showDialCodeInSelection: true,
                      showSearchBox: true,
                      searchBoxPlaceholder: currentLang === 'ar' ? 'ابحث عن الدولة...' : 'Search country...'
                    }"
                    :inputOptions="{
                      placeholder: currentLang === 'ar' ? 'أدخل رقم الهاتف' : 'Enter phone number',
                      type: 'tel',
                      styleClasses: 'custom-phone-input'
                    }"
                    mode="international"
                  />
                </div>

                <transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
                  <div v-if="phoneError" class="flex items-center gap-2.5 p-3.5 mt-2 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs sm:text-sm shadow-inner">
                    <svg class="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>{{ phoneError }}</span>
                  </div>
                </transition>
              </div>

              <div class="space-y-2.5">
                <label class="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  {{ currentLang === 'ar' ? 'الموضوع' : 'Subject' }}
                </label>
                <input type="text" v-model="form.subject" :placeholder="currentLang === 'ar' ? 'عنوان الرسالة أو الاستفسار...' : 'Inquiry subject...'"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-white text-sm sm:text-base placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-stone-600 transition-all duration-300 shadow-inner" />
              </div>

              <div class="space-y-2.5">
                <label class="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                  {{ currentLang === 'ar' ? 'الرسالة' : 'Message' }}
                  <span class="text-amber-400">*</span>
                </label>
                <textarea v-model="form.message" required rows="5" :placeholder="currentLang === 'ar' ? 'اكتب تفاصيل رسالتك هنا بشكل مفصل...' : 'Write your detailed message here...'"
                  class="w-full px-5 py-4 rounded-2xl bg-stone-900/90 border border-stone-700/80 text-white text-sm sm:text-base placeholder-stone-600 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 hover:border-stone-600 transition-all duration-300 resize-none shadow-inner"></textarea>
              </div>

              <div class="pt-4">
                <button type="submit" :disabled="isSubmitting" class="group relative w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-base sm:text-lg tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden">
                  <span class="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></span>
                  <span class="relative z-10">
                    <span v-if="isSubmitting">{{ currentLang === 'ar' ? 'جاري إرسال الرسالة...' : 'SENDING MESSAGE...' }}</span>
                    <span v-else>{{ currentLang === 'ar' ? 'إرسال الرسالة الآن' : 'SEND MESSAGE NOW' }}</span>
                  </span>
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';

import Navbar from '../../components/User/Navbar.vue';
import Footer from '../../components/User/footer.vue';
import sectionbg from '@/assets/puplic_wepsite/navebar/images/button_hover.jpg';
import oldCardBg from '@/assets/puplic_wepsite/navebar/images/navbarnackground.png';

// قراءة اللغة من localStorage أو الـ DOM لضمان التزامن الفوري عند العودة للصفحة
const getStoredLang = () => {
  return localStorage.getItem('locale') || localStorage.getItem('lang') || document.documentElement.getAttribute('lang') || 'ar';
};

const currentLang = ref(getStoredLang());
let observer = null;

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const phoneError = ref('');
const phoneValidationObj = ref(null);

const onPhoneInput = (phone, phoneObject) => {
  phoneValidationObj.value = phoneObject;
  if (phoneObject.valid) {
    phoneError.value = '';
  }
};

const validatePhone = () => {
  if (!form.phone) {
    phoneError.value = currentLang.value === 'ar' ? 'حقل رقم الهاتف مطلوب' : 'Phone number is required';
    return false;
  }
  if (phoneValidationObj.value && !phoneValidationObj.value.valid) {
    phoneError.value = currentLang.value === 'ar' ? 'رقم الهاتف غير صحيح' : 'Invalid phone number';
    return false;
  }
  phoneError.value = '';
  return true;
};

const handleSubmit = () => {
  if (!validatePhone()) return;

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    alert(currentLang.value === 'ar' ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!');
    form.name = '';
    form.email = '';
    form.phone = '';
    form.subject = '';
    form.message = '';
  }, 1000);
};

onMounted(() => {
  // تحديث اللغة عند التحميل وعند أي تغيير في الـ DOM أو الـ localStorage
  currentLang.value = getStoredLang();

  observer = new MutationObserver(() => {
    const lang = getStoredLang();
    if (lang !== currentLang.value) {
      currentLang.value = lang;
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });

  // الاستماع لتغييرات الـ Storage في حال تم تغيير اللغة من تبويب أو مكان آخر
  window.addEventListener('storage', () => {
    currentLang.value = getStoredLang();
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  window.removeEventListener('storage', () => {});
});
</script>

<style>
body .vue-tel-input {
  background-color: #09090b !important;
  border: 1px solid rgba(82, 82, 91, 0.8) !important;
  border-radius: 1rem !important;
  padding: 8px 12px !important;
  min-height: 56px !important;
  display: flex !important;
  align-items: center !important;
}
body .vue-tel-input:focus-within {
  border-color: #f59e0b !important;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1) !important;
}

body .vti__dropdown {
  background: transparent !important;
  border: none !important;
  border-radius: 0.75rem !important;
  padding: 0 10px !important;
  display: flex !important;
  align-items: center !important;
}
body .vti__dropdown:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
body .vti__selection {
  color: #ffffff !important;
}
body .vti__dropdown-arrow {
  color: #f59e0b !important;
}

body .vti__dropdown-list {
  background-color: #09090b !important;
  border: 1px solid rgba(82, 82, 91, 0.8) !important;
  border-radius: 1rem !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9) !important;
  z-index: 99999 !important;
  width: max-content !important;
  min-width: 250px !important;
}
body .vti__dropdown-list.below {
  top: 110% !important;
}
body .vti__dropdown-list.above {
  bottom: 110% !important;
}

body .vti__dropdown-item {
  color: #d4d4d8 !important;
  padding: 12px 14px !important;
  background: transparent !important;
  transition: all 0.2s ease;
}
body .vti__dropdown-item strong {
  color: #fcd34d !important;
}
body .vti__dropdown-item.highlighted,
body .vti__dropdown-item:hover {
  background-color: rgba(245, 158, 11, 0.15) !important;
  color: #ffffff !important;
}

body .vue-tel-input input.custom-phone-input {
  background: transparent !important;
  border: none !important;
  outline: none !important;
  color: #ffffff !important;
  box-shadow: none !important;
  font-size: 1rem !important;
  height: 100% !important;
  padding: 0 10px !important;
}
body .vue-tel-input input.custom-phone-input:focus {
  background: transparent !important;
  box-shadow: none !important;
  outline: none !important;
}
body .vue-tel-input input.custom-phone-input::placeholder {
  color: #52525b !important;
}

body .vti__search_box {
  background-color: #18181b !important;
  border: 1px solid rgba(82, 82, 91, 0.8) !important;
  color: #ffffff !important;
  border-radius: 0.75rem !important;
  padding: 10px !important;
  margin: 10px !important;
  width: calc(100% - 20px) !important;
  outline: none !important;
}
body .vti__search_box::placeholder {
  color: #71717a !important;
}
</style>
