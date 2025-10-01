<template>
  <main>
    <section id="home" class="section hero">
      <div class="container hero-layout" ref="heroRef">
        <div class="hero-content">
          <h1 class="hero-title">Привет, я <span class="accent">{{ profile_info.fullName }}</span></h1>
          <p class="hero-description">
            Ipsum elit ipsum et do labore adipiscing incididunt . dolore dolor tempor eiusmod ut sit consectetur .
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary" type="button" @click="scrollToSection('portfolio')">
              <i class="fa-solid fa-rocket"></i>Мои работы
            </button>
            <button class="btn btn-outline" type="button" @click="scrollToSection('contact')">
              <i class="fa-solid fa-paper-plane"></i>Связаться
            </button>
          </div>
          <ul class="hero-metrics" aria-label="Ключевые цифры">
            <li>
              <span class="value">5+</span>
              <span class="label">лет опыта</span>
            </li>
            <li>
              <span class="value">Более 10</span>
              <span class="label">реализованных проектов</span>
            </li>
          </ul>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="hero-photo">
            <img
              src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1600&auto=format&fit=crop"
              alt="Рабочее место фронтенд-разработчика"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section section-soft">
      <div class="container split" ref="aboutRef">
        <div class="split-content">
          <span class="eyebrow">Обо мне</span>
          <h2 class="section-title">Frontend разработчик из Санкт-Петербурга</h2>
          <p>
            Labore ut dolor eiusmod consectetur . amet do do incididunt elit aliqua. do . dolor elit dolore Lorem do dolore consectetur incididunt . adipiscing magna incididunt tempor eiusmod tempor . tempor magna Lorem eiusmod incididunt magna incididunt .
          </p>
          <p>Ut magna dolor sed et Lorem tempor ut . eiusmod amet aliqua. Lorem et adipiscing labore tempor . sed magna elit labore dolor dolore . amet do et consectetur . sit Lorem consectetur adipiscing sit sit ipsum .
          </p>
          <ul class="feature-list">
            <li>Magna adipiscing adipiscing adipiscing dolore aliqua. adipiscing .</li>
            <li>Elit dolore tempor incididunt dolor amet ut amet .</li>
            <li>Tempor Lorem adipiscing labore elit do ipsum do .</li>
          </ul>
        </div>
        <div class="split-visual">
          <div class="illustration-card">
            <img
              src="https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1600&auto=format&fit=crop"
              alt="Команда разработчиков за работой"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <SkillsSection id="skills" />

    <section id="portfolio" class="section">
      <div class="container" ref="portfolioRef">
        <header class="section-head">
          <span class="eyebrow">Портфолио</span>
          <h2 class="section-title">Мои работы</h2>
        </header>
        <ProjectsGrid />
      </div>
    </section>

    <section id="contact" class="section section-soft">
      <div class="container contact" ref="contactRef">
        <div class="contact-info">
          <span class="eyebrow">Свяжемся</span>
          <h2 class="section-title">Давайте работать вместе!</h2>
          <p>
            Ut dolore adipiscing aliqua. magna aliqua. sit . tempor sed dolor dolore . et ipsum tempor eiusmod .
          </p>
          <ul class="contact-list">
            <li>
              <span class="icon"><i class="fa-solid fa-envelope"></i></span>
              <a :href="emailHref">{{ profile_info.email }}</a>
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-phone"></i></span>
              <a :href="phoneHref">{{ profile_info.phone }}</a>
            </li>
            <li>
              <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
              <span>{{ profile_info.address }}</span>
            </li>
            <li class="social">
              <a class="social-btn" href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
              <a class="social-btn" :href="profile_info.telegram_link" target="_blank" aria-label="Telegram">
                <i class="fa-brands fa-telegram"></i>
              </a>
              <a class="social-btn" :href="emailHref" aria-label="Email">
                <i class="fa-solid fa-envelope"></i>
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed,  } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile'
const {profile} = storeToRefs(useProfileStore())
const profile_info = profile.value

const phoneHref = computed(() => `tel:${profile_info.phone}`)
const emailHref = computed(() => `mailto:${profile_info.email}`)

const heroRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const portfolioRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const { reveal } = useReveal()

const { scrollToSection } = useSectionScroll()

onMounted(() => {
  [heroRef.value, aboutRef.value, portfolioRef.value, contactRef.value].forEach((el) => el && reveal(el))
})
</script>
