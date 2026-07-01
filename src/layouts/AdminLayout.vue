<template>
  <div dir="ltr" class="min-h-screen bg-[#F7F4F0] font-sans flex relative overflow-x-hidden m-0 p-0 box-border w-full">

    <Sidebar ref="sidebarRef" @toggle="syncSidebarState" />

    <div class="flex-1 flex flex-col min-w-0 min-h-screen transition-all duration-300 ease-in-out w-full" :class="{
      'ml-0': isSidebarCollapsed,
      'md:ml-80': !isSidebarCollapsed
    }">
      <Navbar :isCollapsed="isSidebarCollapsed" @open-sidebar="toggleSidebar" />

      <main class="flex-1 py-6 md:py-10 px-4 md:px-12 w-full box-border overflow-x-hidden">
        <RouterView :key="$route.fullPath" />
      </main>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router' // أضف هذا السطر للتأكد من أن الفيو يقرأ المسارات
import Sidebar from '@/components/Admin/Sidebar.vue'
import Navbar from '@/components/Admin/Navbar.vue'

const route = useRoute() // تعريف الـ route الحالي
const sidebarRef = ref(null)
const isSidebarCollapsed = ref(true)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleCollapse()
    isSidebarCollapsed.value = sidebarRef.value.isCollapsed
  }
}

const syncSidebarState = () => {
  if (sidebarRef.value) {
    isSidebarCollapsed.value = sidebarRef.value.isCollapsed
  }
}

onMounted(() => {
  if (sidebarRef.value) {
    isSidebarCollapsed.value = sidebarRef.value.isCollapsed
  }
})
</script>

<style scoped>
/* هيكل متجاوب ونظيف 100% */
</style>
