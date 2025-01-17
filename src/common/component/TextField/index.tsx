import React from "react";
import { styles } from "@common/component/TextField/styles.css.ts";
import { IcClear } from "@asset/svg";

interface TextFieldProps {
  icon?: React.ReactNode;
  state?: "default" | "error";
  active?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClearClick?: () => void;
}

/**
 * TextField 공통 컴포넌트
 * @param icon 오른쪽 아이콘
 * @param state 상태 (default, error)
 * @param active 활성화 여부
 * @param placeholder placeholder
 * @param value 입력값
 * @param onChange 입력값 변경 함수
 * @param onClick input 클릭 함수
 * @param onKeyDown 엔터키 입력 함수
 * @param onClearClick 입력값 삭제 함수
 * @constructor minjeoong
 */

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      icon,
      state = "default",
      active = true,
      placeholder = "검색어를 입력해주세요",
      value,
      onChange,
      onClick,
      onKeyDown,
      onClearClick,
    },
    ref
  ) => {
    return (
      <div className={styles.wrapper({ state, active })} onClick={onClick}>
        <input
          ref={ref}
          type="text"
          className={styles.input({ active })}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={!active}
        />
        {value ? <IcClear onClick={onClearClick} /> : icon}
      </div>
    );
  }
);
