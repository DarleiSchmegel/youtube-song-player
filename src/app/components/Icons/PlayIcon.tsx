import React from "react";

interface Props {
  className?: string;
}
export function PlayIcon({ className }: Props) {
  return (
    <svg
      className={"ml-[13px] " + className}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M29.6901 16.6608L4.00209 0.747111C2.12875 -0.476923 0.599998 0.421814 0.599998 2.75545V33.643C0.599998 35.9728 2.12747 36.8805 4.00209 35.6514L29.6901 19.7402C29.6901 19.7402 30.6043 19.0973 30.6043 18.2012C30.6043 17.3024 29.6901 16.6608 29.6901 16.6608Z"
      />
    </svg>
  );
}
