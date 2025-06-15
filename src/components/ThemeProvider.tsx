
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

// Cache the theme to avoid localStorage reads
let cachedTheme: Theme | null = null

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (cachedTheme) return cachedTheme
    const stored = localStorage.getItem(storageKey) as Theme
    cachedTheme = stored || defaultTheme
    return cachedTheme
  })

  // Use useLayoutEffect for synchronous DOM updates before paint
  useLayoutEffect(() => {
    const root = window.document.documentElement

    // Batch DOM operations for better performance
    root.classList.remove("light", "dark")

    let targetTheme = theme
    if (theme === "system") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }

    // Apply theme class immediately
    root.classList.add(targetTheme)
    
    // Force hardware acceleration for smooth rendering
    root.style.transform = "translateZ(0)"
  }, [theme])

  // Memoize setTheme to prevent unnecessary re-renders
  const setThemeOptimized = useCallback((newTheme: Theme) => {
    // Update cache immediately
    cachedTheme = newTheme
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
