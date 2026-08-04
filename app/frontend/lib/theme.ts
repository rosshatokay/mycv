export interface ThemeMethods {
  initialize: () => void
  setTheme: (theme: string, isSysPref?: boolean) => void
  getTheme: () => string | null
  setByPreference: () => void
  onThemeLoaded: (callback: (event: CustomEvent) => void) => void
}

export const Theme = (() => {
  // Helper to check if we are running in the browser
  const isBrowser = typeof window !== 'undefined'

  // Safely evaluate globals only if we are in the browser, otherwise use fallbacks
  const root = isBrowser ? document.querySelector('html') : null
  const prefersDarkTheme = isBrowser ? window.matchMedia('(prefers-color-scheme: dark)') : null
  let storedTheme = isBrowser ? localStorage.getItem("theme") : null
  const isInLibrary = isBrowser ? document.querySelector('html')?.classList.contains('library') : false
  
  let themeSelector

  function triggerThemeLoaded(theme?: string)
  {
    if (!isBrowser) return
    const event = new CustomEvent('themeLoaded', {
      detail: {
        theme: theme
      }
    })
    document.dispatchEvent(event)
  }

  function setTheme(theme: string, isSysPref?: boolean)
  {
    switch (theme) {
      case "light":
        root?.classList.remove('dark')
        root?.classList.add('light')
      break
      case "dark":
        root?.classList.add('dark')
        root?.classList.remove('light')
      break
      case "system":
        setByPreference()
      break
    }

    if (isInLibrary) {
      root?.classList.add('library')
    }

    if (isBrowser) {
      if (!isSysPref) {
        localStorage.setItem("theme", theme)
      } else {
        localStorage.setItem("theme", 'system')
      }
      storedTheme = localStorage.getItem("theme")
    }

    triggerThemeLoaded(theme)
  }

  function setByPreference()
  {
    if (prefersDarkTheme?.matches)
    {
      setTheme('dark', true)
    } else {
      setTheme('light', true)
    }
  }

  function initialize()
  {
    if (!isBrowser) return

    if (storedTheme) {
      root?.removeAttribute("class")

      setTheme(storedTheme)
      
      setTimeout(function(){
        triggerThemeLoaded(storedTheme as string)
      }, 50)
    } else {
      setByPreference()
    }

    listenToSysPref()

    document.addEventListener('DOMContentLoaded', () => {
      themeSelector = document.getElementById('theme-selector')
    })
  }

  function listenToSysPref()
  {
    if (!isBrowser) return

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',({ matches }) => {
      if (matches) {
        setTheme('dark', true)
      } else {
        setTheme('light', true)
      }
    })
  }

  function getTheme() {
    return isBrowser ? localStorage.getItem('theme') : null
  }

  return {
    initialize,
    setTheme,
    getTheme,
    setByPreference,
    onThemeLoaded: (callback: any) => {
      if (!isBrowser) return
      document.addEventListener('themeLoaded', callback)
    }
  }
})()