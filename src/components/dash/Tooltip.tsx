import React from "react";
interface TooltipProps {
  text: string;
  visible: boolean;
}
export function Tooltip({ text, visible }: TooltipProps) {
  return (
    <div
      className={`
        absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm
        rounded shadow-lg transform transition-all duration-200
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}
      `}
    >
      <div className="relative">
        <div className="absolute -left-1 top-1/2 -mt-1 border-4 border-transparent border-r-gray-800" />
        {text}
      </div>
    </div>
  );
}
