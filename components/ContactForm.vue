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
      <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
        <i class="fa-regular fa-paper-plane"></i>
        <span v-if="!isSubmitting">Отправить сообщение</span>
        <span v-else>Отправка...</span>
      </button>
      <p
        v-if="note.text"
        :class="['note', note.state]"
        role="status"
        aria-live="polite"
      >
        {{ note.text }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
const contactSettings = useContactSettingsStore()

type NoteState = 'idle' | 'info' | 'success' | 'error'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const note = reactive<{ text: string; state: NoteState }>({
  text: '',
  state: 'idle'
})
const isSubmitting = ref(false)

const setNote = (text: string, state: NoteState) => {
  note.text = text
  note.state = state
}

const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const onSubmit = async () => {
  if (isSubmitting.value) return

  const errors: string[] = []

  if (!form.name) errors.push('Введите имя')
  if (!validateEmail(form.email)) errors.push('Проверьте email')
  if (!form.message) errors.push('Сообщение пустое')

  if (errors.length) {
    setNote(`⚠ ${errors.join(' · ')}`, 'error')
    return
  }

  const endpoint = contactSettings.handlerUrl?.trim()

  if (!endpoint) {
    setNote('⚠ Не настроен адрес для отправки сообщения', 'error')
    return
  }

  try {
    isSubmitting.value = true
    setNote('⌛ Отправка...', 'info')

    const body = new URLSearchParams({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    })

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body
    })

    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(responseText || 'Не удалось отправить сообщение')
    }

    const successMessage = responseText || 'Сообщение отправлено. Я свяжусь с вами в ближайшее время!'
    setNote(`✔ ${successMessage}`, 'success')
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Произошла ошибка при отправке'
    setNote(`⚠ ${message}`, 'error')
  } finally {
    isSubmitting.value = false
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

.note {
  font-size: 0.9rem;
  margin: 0;
}

.note.success {
  color: color-mix(in oklab, var(--success, #0a7f3b) 80%, var(--text));
}

.note.error {
  color: color-mix(in oklab, var(--danger, #b3261e) 80%, var(--text));
}

.note.info {
  color: color-mix(in oklab, var(--primary) 80%, var(--text));
}

@media (max-width: 640px) {
  .contact-form {
    padding: 24px;
  }
}
</style>
