import { Outlet } from "react-router-dom";
import { Header } from ".";

export function Layout() {
  return (
    <div className="flex w-full bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="relative flex flex-grow justify-center">
        <Outlet />
      </main>
    </div>
  );
}
