<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="container">
        <nav class="site-nav">
          <button class="logo" type="button" @click="scrollToSection('home')">
            <span class="logo-badge"><i class="fa-solid fa-code"></i></span>
            <span>Frontend<span class="accent">Dev</span></span>
          </button>
          <div class="nav-links">
            <button type="button" @click="scrollToSection('home')">Главная</button>
            <button type="button" @click="scrollToSection('about')">Обо мне</button>
            <button type="button" @click="scrollToSection('skills')">Навыки</button>
            <button type="button" @click="scrollToSection('portfolio')">Портфолио</button>
            <button type="button" @click="scrollToSection('contact')">Контакты</button>
          </div>
        </nav>
      </div>
    </header>
    <NuxtPage />
    <footer class="site-footer">
      <div class="container">
        <small class="muted">© 2025 {{ profile_info.fullName }}</small>
      </div>
    </footer>
    <ThemeSwitcher />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProfileStore } from '~/stores/profile'

const { scrollToSection } = useSectionScroll()
const {profile} = storeToRefs(useProfileStore())
const profile_info = profile.value

useTheme()
</script>
