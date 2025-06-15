
import { createContext, useContext, useLayoutEffect, useState, useCallback } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "market01-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = localStorage.getItem(storageKey) as Theme
    return stored || defaultTheme
  })

  useLayoutEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    let targetTheme = theme
    if (theme === "system") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    root.classList.add(targetTheme)
  }, [theme])

  const setThemeOptimized = useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }, [storageKey])

  const value = {
    theme,
    setTheme: setThemeOptimized,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
