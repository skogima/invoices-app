import { Outlet } from "react-router-dom";
import { Header } from ".";

export function Layout() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 lg:flex-row">
      <Header />

      <main className="relative flex flex-grow justify-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
