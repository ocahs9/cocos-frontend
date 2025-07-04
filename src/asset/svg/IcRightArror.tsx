import * as React from "react";
import type { SVGProps } from "react";

const SvgIcRightArror = (props: SVGProps<SVGSVGElement>) => {
  const { stroke = "#717171", ...rest } = props;  // 기본 stroke 색상 설정

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...rest}>
      <path
        stroke={stroke} 
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7.5 15 5-5-5-5"
      />
    </svg>
  );
};

export default SvgIcRightArror;