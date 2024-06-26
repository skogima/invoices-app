import { Outlet } from "react-router-dom";
import { Header } from ".";
import { FormContainer } from "@/components";

export function Layout() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-gray-100 dark:bg-gray-900 lg:flex-row">
      <Header />

      <FormContainer />

      <main className="custom-scroll relative flex flex-grow justify-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
