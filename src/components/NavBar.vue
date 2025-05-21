<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const mobileOpen = ref(false)
const route = useRoute()

const links = [
  { label: 'Home', path: '/' },
  { label: 'Items', path: '/items' },
  { label: 'Create a Sheet', path: '/create' },
  { label: 'Dashboard', path: '/dashboard' },
]

const isActive = (p: string) => route.path === p
</script>

<template>
  <!-- MAIN BAR -->
  <nav
    class="navbar sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-lg shadow-lg transition-all duration-300 px-2 sm:px-6 xl:px-48"
  >
    <!-- Brand + mobile burger -->
    <div class="navbar-start">
      <button
        class="btn btn-ghost lg:hidden"
        aria-label="Open main menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-transform duration-300"
          :class="{ 'rotate-90': mobileOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <RouterLink to="/" class="btn btn-ghost text-xl font-black tracking-tight animate-pulse">
        <p class="text-accent">TFT Cheat-Sheet</p>
      </RouterLink>
    </div>

    <!-- Desktop links -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal gap-1 px-1">
        <li v-for="l in links" :key="l.path">
          <RouterLink
            :to="l.path"
            class="px-3 py-2 rounded transition-colors duration-200 hover:underline text-md"
            :class="{ 'bgtext-base-100 font-extrabold': isActive(l.path) }"
          >
            {{ l.label }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- Theme toggle -->
    <div class="navbar-end">
      <label class="flex cursor-pointer gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path
            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          />
        </svg>
        <input type="checkbox" value="retro" class="toggle theme-controller" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </div>
  </nav>

  <!-- MOBILE DROPDOWN -->
  <transition name="slide-fade">
    <ul
      v-if="mobileOpen"
      class="menu menu-vertical lg:hidden w-full bg-base-100 rounded-b-box p-2 shadow mt-1"
    >
      <li v-for="l in links" :key="l.path">
        <RouterLink
          :to="l.path"
          class="px-3 py-2 rounded hover:bg-base-200"
          :class="{ 'bg-accent text-base-100': isActive(l.path) }"
          @click="mobileOpen = false"
        >
          {{ l.label }}
        </RouterLink>
      </li>
    </ul>
  </transition>
</template>

<style scoped>
/* Simple slide-fade animation for the mobile dropdown */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.menu a {
  color: var(--text-primary) !important;
  transition: all 0.3s ease;
}

.menu a:hover {
  text-decoration: underline;
  text-underline-offset: 10px;
  background: var(--text-secondary);
}
</style>
