import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ProjectLink = {
  demo: string
  code: string
}

export type Project = {
  id: number
  title: string
  stack: string[]
  img: string
  desc: string
  links: ProjectLink
}

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>([
        {
            id: 1,
            title: 'Аdipiscing aliqua. tempor',
            stack: ['React', 'ipsum', 'tempor'],
            img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop',
            desc: 'Adipiscing aliqua. consectetur do tempor . aliqua. ut Lorem ipsum consectetur labore .',
            links: { demo: '#', code: '#' }
        },
        {
            id: 2,
            title: 'Magna sed sed',
            stack: ['Vue', 'amet', 'sit'],
            img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop',
            desc: 'Adipiscing elit elit do . elit et dolor et Lorem do labore consectetur .',
            links: { demo: '#', code: '#' }
        },
        {
            id: 2,
            title: 'Sed Lorem sit',
            stack: ['Vue', 'sed', 'elit'],
            img: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop',
            desc: 'Incididunt incididunt magna dolore adipiscing ipsum adipiscing amet . adipiscing dolor tempor sed et amet Lorem .',
            links: { demo: '#', code: '#' }
        },
        {
            id: 3,
            title: 'Adipiscing magna ut sed dolore',
            stack: ['JavaScript', 'incididunt', 'aliqua'],
            img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
            desc: 'Do adipiscing consectetur magna elit amet .',
            links: { demo: '#', code: '#' }
        }
    ])
    return {projects};
})