import { useState } from "react";

export function useDarkMode() {
  const defaultValue = document.documentElement.classList.contains("dark");

  const [isDark, setIsDark] = useState(defaultValue);

  function toggleDarkTheme() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    try {
      localStorage.setItem("is-dark-mode", String(!isDark));
    } catch (error) {
      console.error(error);
    }

    setIsDark(!isDark);
  }

  return {
    isDark,
    toggleDarkTheme,
  };
}
