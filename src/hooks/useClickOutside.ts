import { useEffect, RefObject } from "react";

export function useClickOutside(element: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  function onClickOutside(event: MouseEvent) {
    if (!element.current) {
      return;
    }

    if (!element.current.contains(event.target as HTMLElement)) {
      callback();
    }
  }
}
