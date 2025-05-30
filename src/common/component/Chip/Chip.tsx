"use client";

import {useEffect, useState} from "react";
import {chipItem, ChipType} from "./ChipStyle.css.ts";
import {IcDelete} from "@asset/svg/index";

interface ChipProps {
  label: string;
  icon?: boolean;
  color?: "blue" | "gray";
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
}

type CombinedChipProps = ChipProps & Exclude<ChipType, undefined>;
const Chip = ({
  label,
  icon = false,
  color = "blue",
  onClick,
  isSelected = false,
  disabled = false,
}: CombinedChipProps) => {
  const [isActive, setIsActive] = useState(isSelected);

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  const handleClick = () => {
    if (disabled) return;
    if (color === "gray" || (size === "large" && icon === false)) return;
    if (!icon) setIsActive(!isActive);
    onClick?.();
  };

  const size = icon ? "large" : "small";

  return (
    <div className={chipItem({ size, color, active: isActive })} onClick={handleClick}>
      {label}
      {icon && (
        <IcDelete
          width={24}
          height={24}
          stroke={color === "gray" ? "#717171" : "#14B5F0"}
          style={{
            position: "relative",
            bottom: "1.3px",
          }}
        />
      )}
    </div>
  );
};

export default Chip;
