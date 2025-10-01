export const useReveal = () => {
  const reveal = (el: Element) => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          (target as HTMLElement).animate(
            [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)' }
          )
          io.unobserve(target)
        }
      })
    }, { threshold: 0.2 })
    io.observe(el)
  }
  return { reveal }
}
