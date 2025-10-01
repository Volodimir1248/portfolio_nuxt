import { ref } from 'vue'
import { defineStore } from 'pinia'

export type Profile = {
  fullName: string
  email: string
  phone: string
  address: string
  telegram_link: string
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>({
    fullName: 'Фронтенд Фронтендов',
    email: 'mail@mail.com',
    phone: '+7 (111) 111-11-11',
    address: 'Санкт-петербург, Россия',
    telegram_link: 'https://t.me/'
  })
  return { profile }
})
