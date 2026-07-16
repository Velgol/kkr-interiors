import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      {/* Icon badge */}
     <img
   src="/images/logo.png"
   alt="KKR Interiors logo"
   className="h-14 w-14 md:h-16 md:w-16 object-contain shrink-0"
/>

      {/* Brand Name */}
      <div className="leading-tight flex flex-col justify-center">
        <h1
          className="font-serif font-bold text-[16px] md:text-[19px] whitespace-nowrap"
          style={{
            letterSpacing: "1.5px",
          }}
        >
          <span className="text-white">KKR </span>
          <span
            className="text-[#D4AF37]"
            style={{ textShadow: "0 0 8px rgba(212,175,55,0.25)" }}
          >
            INTERIORS
          </span>
        </h1>

        <p
          className="font-serif italic text-[13px] md:text-[15px] text-[#D4AF37] mt-0.5"
          style={{
            opacity: 0.9,
            letterSpacing: "0.3px",
          }}
        >
          Designing Your Dreams
        </p>
      </div>
    </div>
  );
}