import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useDarkMode() {
  const defaultValue = document.documentElement.classList.contains("dark");

  const { store } = useLocalStorage("is-dark-mode", String(defaultValue));

  const [isDark, setIsDark] = useState(defaultValue);

  function toggleDarkTheme() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    try {
      store(String(!isDark));
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
