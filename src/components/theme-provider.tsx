"use client"

import * as React from "react"

type Theme = "dark" | "light" | "system"
type FontSize = "sm" | "md" | "lg" | "xl"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultFontSize?: FontSize
  storageKey?: string
  fontSizeStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  fontSize: "md",
  setFontSize: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultFontSize = "md",
  storageKey = "ui-theme",
  fontSizeStorageKey = "ui-font-size",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(
    () => (typeof window !== 'undefined' && localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [fontSize, setFontSize] = React.useState<FontSize>(
    () => (typeof window !== 'undefined' && localStorage.getItem(fontSizeStorageKey) as FontSize) || defaultFontSize
  )

  React.useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.remove("font-size-sm", "font-size-md", "font-size-lg", "font-size-xl")


    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
    } else {
        root.classList.add(theme)
    }

    root.classList.add(`font-size-${fontSize}`)

  }, [theme, fontSize])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    fontSize,
    setFontSize: (size: FontSize) => {
        localStorage.setItem(fontSizeStorageKey, size)
        setFontSize(size)
    }
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
