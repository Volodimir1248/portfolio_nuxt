export type SectionId = 'home' | 'about' | 'skills' | 'portfolio' | 'contact'

export const useSectionScroll = () => {
  const scrollToSection = (section: SectionId) => {
    if (!import.meta.client) {
      return
    }

    const target = document.getElementById(section)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { scrollToSection }
}
