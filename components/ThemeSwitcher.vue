<template>
  <div v-if="isReady" class="theme-toggle">
    <button
      class="theme-fab"
      type="button"
      :aria-label="`Переключатель темы. Текущий режим: ${modeName}. Нажмите, чтобы переключить.`"
      @click="handleToggle"
    >
      <i :class="iconClass" />
      <span class="sr-only">Переключение темы</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { mode, resolved, toggle } = useTheme()

const isReady = ref(false)

onMounted(() => {
  isReady.value = true
})

const iconClass = computed(() => {
  const current = mode.value
  if (current === 'light') return 'fa-solid fa-sun'
  if (current === 'dark') return 'fa-solid fa-moon'
  return 'fa-solid fa-circle-half-stroke'
})

const modeName = computed(() => {
  if (mode.value === 'light') return 'светлая'
  if (mode.value === 'dark') return 'тёмная'
  const current = resolved.value === 'dark' ? 'тёмная' : 'светлая'
  return `системная (сейчас ${current})`
})

const handleToggle = () => {
  toggle()
}
</script>
