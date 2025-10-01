export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

let systemMediaQuery: MediaQueryList | null = null
let systemChangeHandler: ((event: MediaQueryListEvent) => void) | null = null
let systemListenerBound = false

export const useTheme = () => {
  const mode = useState<ThemeMode>('theme-mode', () => 'system')
  const resolved = useState<ResolvedTheme>('theme-resolved', () => 'light')
  const cookie = useCookie<ThemeMode>('theme-mode', {
    sameSite: 'lax',
    path: '/',
    default: () => 'system',
  })

  if (cookie.value === 'light' || cookie.value === 'dark' || cookie.value === 'system') {
    mode.value = cookie.value
  } else {
    cookie.value = 'system'
  }

  const resolveTheme = (value: ThemeMode): ResolvedTheme => {
    if (value === 'system') {
      if (process.client && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }

    return value
  }

  resolved.value = resolveTheme(mode.value)

  useHead(() => ({
    htmlAttrs: {
      'data-theme': resolved.value,
      'data-theme-mode': mode.value,
      style: `color-scheme: ${resolved.value};`,
    },
  }))

  const apply = (value: ThemeMode) => {
    const resolvedTheme = resolveTheme(value)
    resolved.value = resolvedTheme
    cookie.value = value

    if (!process.client) {
      return resolvedTheme
    }

    const root = document.documentElement
    root.dataset.theme = resolvedTheme
    root.dataset.themeMode = value
    root.style.colorScheme = resolvedTheme
    localStorage.setItem('theme-mode', value)

    return resolvedTheme
  }

  const setMode = (value: ThemeMode) => {
    mode.value = value
    apply(value)
    return mode.value
  }

  const toggle = () => {
    if (mode.value === 'light') return setMode('dark')
    if (mode.value === 'dark') return setMode('system')
    return setMode('light')
  }

  const ensureSystemListener = () => {
    if (!process.client || systemListenerBound) return

    systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    systemChangeHandler = () => {
      if (mode.value === 'system') {
        apply('system')
      }
    }

    if ('addEventListener' in systemMediaQuery) {
      systemMediaQuery.addEventListener('change', systemChangeHandler)
    } else if ('addListener' in systemMediaQuery && typeof systemMediaQuery.addListener === 'function') {
      systemMediaQuery.addListener(systemChangeHandler as EventListener)
    }
    systemListenerBound = true
  }

  onMounted(() => {
    if (!process.client) return

    const saved = localStorage.getItem('theme-mode')
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      mode.value = saved
      cookie.value = saved
    }

    ensureSystemListener()
    apply(mode.value)
  })

  return { mode, resolved, setMode, toggle, resolveTheme }
}
