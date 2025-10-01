<template>
  <div class="projects">
    <div class="filter-chips" role="toolbar" aria-label="Фильтр проектов">
      <button type="button" class="chip" :class="{ active: filter === 'all' }" @click="set('all')">Все</button>
      <button type="button" class="chip" :class="{ active: filter === 'react' }" @click="set('react')">React</button>
      <button type="button" class="chip" :class="{ active: filter === 'vue' }" @click="set('vue')">Vue</button>
      <button type="button" class="chip" :class="{ active: filter === 'js' }" @click="set('js')">Чистый JS</button>
    </div>
    <TransitionGroup appear name="project-fade" tag="div" class="project-grid" aria-live="polite">
      <article v-for="p in filtered" :key="p.id" class="project-card">
        <div class="project-thumb">
          <img :src="p.img" :alt="p.title" loading="lazy" />
        </div>
        <div class="project-body">
          <h3>{{ p.title }}</h3>
          <p class="muted">{{ p.desc }}</p>
          <ul class="skill-tags">
            <li v-for="t in p.stack" :key="t">{{ t }}</li>
          </ul>
        </div>
        <div class="project-actions">
          <a class="btn btn-soft" :href="p.links.demo" aria-label="Демо проекта" target="_blank" rel="noopener">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>Демо</span>
          </a>
          <a class="btn btn-outline" :href="p.links.code" aria-label="Репозиторий проекта" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i>
            <span>Код</span>
          </a>
        </div>
      </article>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProjectsStore } from '../stores/projects'

const { projects } = storeToRefs(useProjectsStore())

const filter = ref<'all' | 'react' | 'vue' | 'js'>('all')
const set = (f: typeof filter.value) => {
  filter.value = f
}

const filterTags: Record<Exclude<typeof filter.value, 'all'>, string[]> = {
  react: ['react'],
  vue: ['vue'],
  js: ['javascript', 'js']
}

const filtered = computed(() =>
  filter.value === 'all'
    ? projects.value
    : projects.value.filter((p) =>
        p.stack.some((tag) => filterTags[filter.value]?.includes(tag.toLowerCase()))
      )
)
</script>

<style scoped>
.chip.active {
  background: linear-gradient(135deg, var(--primary), var(--primary-accent));
  color: #fff;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
}

.project-fade-enter-active,
.project-fade-leave-active {
  transition: opacity 360ms cubic-bezier(.2, .7, .2, 1), transform 360ms cubic-bezier(.2, .7, .2, 1);
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.project-fade-move {
  transition: transform 360ms cubic-bezier(.2, .7, .2, 1);
}
</style>
