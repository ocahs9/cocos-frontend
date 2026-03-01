import * as React from "react";
import type { SVGProps } from "react";
const SvgIcClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M8 4v4l2.667 1.333m4-1.333A6.667 6.667 0 1 1 1.334 8a6.667 6.667 0 0 1 13.333 0"
    />
  </svg>
);
export default SvgIcClock;
