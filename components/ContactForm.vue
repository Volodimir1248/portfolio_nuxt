<template>
  <form class="contact-form" @submit.prevent="onSubmit" novalidate>
    <div class="field">
      <label class="sr-only" for="contact-name">Ваше имя</label>
      <input
        id="contact-name"
        v-model.trim="form.name"
        name="name"
        class="control"
        type="text"
        placeholder="Ваше имя"
        autocomplete="name"
        required
      />
    </div>
    <div class="field">
      <label class="sr-only" for="contact-email">Email</label>
      <input
        id="contact-email"
        v-model.trim="form.email"
        name="email"
        class="control"
        type="email"
        placeholder="Email"
        autocomplete="email"
        required
      />
    </div>
    <div class="field">
      <label class="sr-only" for="contact-subject">Тема</label>
      <input
        id="contact-subject"
        v-model.trim="form.subject"
        name="subject"
        class="control"
        type="text"
        placeholder="Тема"
        autocomplete="organization-title"
      />
    </div>
    <div class="field">
      <label class="sr-only" for="contact-message">Сообщение</label>
      <textarea
        id="contact-message"
        v-model.trim="form.message"
        name="message"
        class="control"
        placeholder="Сообщение"
        rows="4"
        required
      ></textarea>
    </div>
    <div class="form-footer">
      <button class="btn btn-primary" type="submit">
        <i class="fa-regular fa-paper-plane"></i>
        Отправить сообщение
      </button>
      <p class="muted" role="status" aria-live="polite">{{ note }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
const form = reactive({ name: '', email: '', subject: '', message: '' })
const note = ref('')

const onSubmit = () => {
  const errors: string[] = []

  if (!form.name) errors.push('Введите имя')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.push('Проверьте email')
  if (!form.message) errors.push('Сообщение пустое')

  note.value = errors.length ? `⚠ ${errors.join(' · ')}` : '✔ Спасибо! Сообщение отправлено (демо).'

  if (!errors.length) {
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  }
}
</script>

<style scoped>
.contact-form {
  display: grid;
  gap: 18px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
  box-shadow: var(--shadow-sm);
  transition: transform 400ms cubic-bezier(.2, .7, .2, 1), box-shadow var(--transition), border-color var(--transition), background-color var(--transition);
}

.contact-form:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: color-mix(in oklab, var(--primary) 20%, var(--border));
}

.field {
  display: grid;
  gap: 8px;
}

.control {
  width: 100%;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid color-mix(in oklab, var(--border) 80%, transparent);
  background: var(--surface-soft);
  color: var(--text);
  font: inherit;
  transition: var(--transition);
}

.control:focus {
  outline: none;
  border-color: color-mix(in oklab, var(--primary) 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 30%, transparent);
  background: color-mix(in oklab, var(--surface) 80%, var(--surface-soft));
}

.control::placeholder {
  color: color-mix(in oklab, var(--muted) 80%, transparent);
}

textarea.control {
  min-height: 160px;
  resize: vertical;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

@media (max-width: 640px) {
  .contact-form {
    padding: 24px;
  }
}
</style>
