import { type ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"button"> & {
  variant: "primary" | "secondary" | "tertiary" | "danger";
};

export function Button(props: Props) {
  const colorVariant: Record<Props["variant"], string> = {
    primary: "text-white bg-violet hover:bg-violet-light",
    secondary:
      "text-blue-gray-300 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-white",
    tertiary:
      "text-blue-gray-400 dark:text-gray-200 bg-gray-600 hover:bg-gray-950 dark:hover:bg-gray-800",
    danger: "text-white bg-red hover:bg-red-light",
  };

  return (
    <button
      {...props}
      className={`flex h-12 items-center rounded-full px-6 font-bold ${
        colorVariant[props.variant]
      } ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}
