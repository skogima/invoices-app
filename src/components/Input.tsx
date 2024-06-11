import { ComponentPropsWithRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = ComponentPropsWithRef<"div"> & {
  id: string;
  label: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  register?: UseFormRegisterReturn;
  error?: boolean;
  errorMessage?: string;
};

export function Input({
  id,
  label,
  type,
  register,
  error,
  errorMessage,
  ...rest
}: Readonly<Props>) {
  return (
    <div {...rest} className={"space-y-2 " + (rest.className ?? "")}>
      <div className="flex w-full items-center">
        {label && (
          <label className={`${error ? "text-red" : ""}`} htmlFor={id}>
            {label}
          </label>
        )}
        {errorMessage && (
          <p role="alert" className="ml-auto text-red">
            {errorMessage}
          </p>
        )}
      </div>
      <input
        type={type ?? "text"}
        id={id}
        className={`h-[48px] w-full rounded border ${error ? "border-red" : "border-gray-200 focus:border-violet dark:border-gray-700 focus:dark:border-violet"} bg-white pl-5 pr-2 text-heading-s-variant font-bold text-gray-950 outline-none dark:bg-gray-800 dark:text-white`}
        {...register}
      />
    </div>
  );
}
