import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";
import moonIcon from "@/assets/icon-moon.svg";
import sunIcon from "@/assets/icon-sun.svg";
import profileIcon from "@/assets/profile-icon.png";
import { useDarkMode } from "@/hooks/useDarkMode";

export function Header() {
  const { isDark, toggleDarkTheme } = useDarkMode();

  return (
    <header className="sticky top-0 z-20 flex h-20 w-screen shrink-0 justify-between overflow-hidden bg-gray-600 dark:bg-gray-800 lg:h-screen lg:w-[103px] lg:flex-col lg:rounded-r-lg">
      <Link to="/">
        <div className="group relative flex h-full w-20 overflow-hidden rounded-r-lg bg-violet lg:h-24 lg:w-full">
          <img src={logo} alt="branding logo" role="presentation" className="z-10 m-auto " />

          <div className="rounded-tl-2xl absolute bottom-0 h-1/2 w-full bg-violet-light transition-all group-hover:h-5/6"></div>
        </div>
      </Link>

      <div className="mr-6 flex items-center gap-6 lg:mb-6 lg:mr-0 lg:flex-col">
        <button className="rounded-full p-4" onClick={toggleDarkTheme}>
          <img src={isDark ? sunIcon : moonIcon} role="presentation" alt="" />
        </button>

        <div className="h-full w-px bg-gray-500 lg:h-px lg:w-full" />

        <a href="https://github.com/skogima/invoices-app" className="h-10 w-10 rounded-full ">
          <img src={profileIcon} role="presentation" alt="" className="w-full rounded-full" />
        </a>
      </div>
    </header>
  );
}
