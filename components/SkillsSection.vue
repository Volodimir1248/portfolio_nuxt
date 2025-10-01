<template>
  <section id="skills" class="section">
    <div class="container" ref="rootRef">
      <header class="section-head">
        <span class="eyebrow">Навыки</span>
        <h2 class="section-title">Мои навыки</h2>
      </header>
      <div class="skills-grid">
        <article class="skill-card">
          <div class="skill-head">
            <span class="skill-icon"><i class="fa-brands fa-vuejs"></i></span>
            <h3>Сonsectetur</h3>
          </div>
          <p class="muted">
            Elit amet consectetur Lorem labore consectetur elit do . dolore magna consectetur dolore Lorem . do do labore et dolor eiusmod dolore sed .
          </p>
          <ProgressBar :value="80" />
          <ul class="skill-tags">
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
          </ul>
        </article>
        <article class="skill-card">
          <div class="skill-head">
            <span class="skill-icon"><i class="fa-solid fa-server"></i></span>
            <h3>Adipiscing</h3>
          </div>
          <p class="muted">
            Ut sed dolore dolor adipiscing amet labore ut . dolor dolore incididunt dolor dolore dolor magna . amet elit elit sed eiusmod .
          </p>
          <ProgressBar :value="60" />
          <ul class="skill-tags">
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
          </ul>
        </article>
        <article class="skill-card">
          <div class="skill-head">
            <span class="skill-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
            <h3>Consectetur</h3>
          </div>
          <p class="muted">
            Incididunt aliqua. amet labore elit adipiscing . consectetur ut incididunt incididunt dolor magna tempor aliqua. . aliqua. ut ut tempor et et do .
          </p>
          <ProgressBar :value="70" />
          <ul class="skill-tags">
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
            <li>dolore elit dolor</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rootRef = ref<HTMLElement | null>(null)
const { reveal } = useReveal()

onMounted(() => {
  rootRef.value && reveal(rootRef.value)
})
</script>
