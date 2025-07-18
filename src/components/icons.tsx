import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="32"
      height="32"
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M80,168V104a32,32,0,0,1,64,0v64"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
      <path
        d="M112,88h88l-24,80H80"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      />
    </svg>
  );
}
