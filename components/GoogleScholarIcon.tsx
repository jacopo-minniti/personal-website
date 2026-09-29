import React from "react";

type GoogleScholarIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

// Monochrome "Google Scholar" icon: the classic lower-case "g" wearing a
// graduation cap, tinted with currentColor so it matches the other nav icons.
export function GoogleScholarIcon({ size = 20, ...props }: GoogleScholarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
       {...props}
     >
       {/* lower-case g bowl */}
       <path
        fillRule="evenodd"
        d="M32 30 C44 30 53 39 53 50 C53 61 44 68 32 68 C20 68 11 61 11 50 C11 39 20 30 32 30 Z M32 40 C26 40 21 44 21 50 C21 56 26 60 32 60 C38 60 43 56 43 50 C43 44 38 40 32 40 Z"
       />

       {/* g descender, hooking to the left */}
       <path d="M48 44 C52 48 51 58 40 64 L36 59 C43 55 43 50 41 47 Z" />

       {/* graduation cap (mortarboard) perched on top */}
       <polygon points="32 8 55 20 32 32 9 20" />
       <path d="M22 22 L22 33 C22 38 42 38 42 33 L42 22" />
       <path d="M22 22 C22 30 42 30 42 22" />

       {/* tassel hanging off the right side */}
       <polygon points="32 20 55 20 55 23 32 23" />
       <polygon points="53 20 55.3 20 55.3 34 53 34" />
       <circle cx="54" cy="36" r="3.2" />
     </svg>
   );
}
