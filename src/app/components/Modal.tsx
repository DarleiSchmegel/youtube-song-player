import React from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
}
export function Modal({ children, className, onClose, open }: Props) {
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed max-h-screen  inset-0 z-50 bg-gray-900 bg-opacity-95  flex items-center">
      <div
        className={`relative py-9 my-8 bg-white max-h-[98vh]  w-full  m-auto flex-col flex rounded-lg ${className}`}
      >
        <div className="overflow-auto ">{children}</div>
        <span className="absolute top-0 right-0 p-4">
          <button onClick={() => onClose()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </div>
    </div>
  );
}
