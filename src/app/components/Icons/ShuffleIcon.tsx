import React from "react";

interface Props {
  className?: string;
}
export function ShuffleIcon({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 32"
      strokeWidth="1.5"
      stroke="currentColor"
      className={"mt-[10px] " + className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 20L21 17M21 17L18 14M21 17H17C14.2386 17 12 14.7614 12 12C12 9.23858 9.76142 7 7 7H3M18 4L21 7M21 7L18 10M21 7L17 7C15.8744 7 14.8357 7.37194 14 7.99963M3 17H7C8.12561 17 9.16434 16.6277 10 16"
      />
    </svg>
  );
}
