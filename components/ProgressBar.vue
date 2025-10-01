<template>
  <div class="bar" :data-value="value">
    <span :style="{ width }"></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ value: number }>()
const width = ref('0%')

onMounted(() => {
  requestAnimationFrame(() => {
    width.value = `${props.value}%`
  })
})
</script>

<style scoped>
.bar {
  position: relative;
  height: 10px;
  border-radius: 999px;
  background: color-mix(in oklab, var(--surface-soft) 60%, var(--surface));
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--primary), var(--primary-accent));
  transition: width 0.6s cubic-bezier(.2, .7, .2, 1);
}

.bar::after {
  content: attr(data-value) '%';
  position: absolute;
  top: -28px;
  right: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
}
</style>
