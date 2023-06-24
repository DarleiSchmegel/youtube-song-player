import { ArrowUpRightIcon, PrinterIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | "default"
    | "primary"
    | "secundary"
    | "tertiary"
    | "arrow-up-right"
    | "printer"
    | "icon";
  children?: ReactNode;
  type?: "submit" | "button" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant,
  className,
  disabled = false,
  ...props
}: ButtonProps) {
  switch (variant) {
    case "primary":
      return (
        <button
          {...props}
          className={`
          ${disabled ? "cursor-not-allowed" : ""}
          rounded-md  
          border-2 
          border-gray-800
          py-2
          px-9
          text-lg
          font-medium
          text-gray-800
          hover:text-gray-100 
            hover:bg-gray-800 ${className}`}
        >
          {children}
        </button>
      );
    case "secundary":
      return (
        <button
          {...props}
          disabled={disabled}
          className={`
          ${disabled ? "cursor-not-allowed" : ""}
          rounded-md
          border-2 
          border-green-400
          py-[5px]
          px-9 
          text-lg
          text-green-400 
           
          hover:text-gray-100 
          hover:bg-green-400 
          ${className}`}
        >
          {children}
        </button>
      );

    case "tertiary":
      return (
        <button
          disabled={disabled}
          className={`
          bg-[#5E3187]
          hover:bg-[#512876]

          text-white
          font-bold
          py-2
          px-4
          rounded
          focus:outline-none
          focus:shadow-outline 
          ${disabled ? "cursor-not-allowed" : ""}
          ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    case "arrow-up-right":
      return (
        <button
          {...props}
          className={`${className} p-[6px] bg-secondary hover:opacity-90 m-3 rounded-sm text-gray-100`}
        >
          <ArrowUpRightIcon className={"w-full"} />

          {children}
        </button>
      );
    case "printer":
      return (
        <button
          {...props}
          className={`w-8 h-8 p-[6px] bg-secondary hover:opacity-90 m-3 rounded-sm text-gray-100 ${className} `}
        >
          <PrinterIcon />
          {children}
        </button>
      );
    case "icon":
      return (
        <button
          {...props}
          className={`w-8 h-8 p-[6px] bg-secondary hover:opacity-90 m-3 rounded-sm text-gray-100 ${className} `}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          {...props}
          className="rounded-md border-2 
          disabled:cursor-not-allowed
          border-gray-700 dark:bg-green-400 px-9 py-2.5 text-lg font-medium text-gray-700 "
        >
          {children}
        </button>
      );
  }
}
