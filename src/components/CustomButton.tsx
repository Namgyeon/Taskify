// src/components/CustomButton.tsx
import React from "react";
import "./customButton.css";

export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "outline" | "filled";

export interface CustomButtonProps {
  label: string;
  size?: ButtonSize; // 선택적 prop
  variant?: ButtonVariant; // 선택적 prop
  backgroundColor?: string; // 선택적 prop
  color?: string; // 선택적 prop
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  size = "md", // 디폴트 값
  variant = "outline", // 디폴트 값
  backgroundColor,
  color,
}) => {
  const style: React.CSSProperties = { backgroundColor, color };

  return (
    <button
      className={[
        "custom-button",
        `custom-button--${size}`,
        `custom-button--${variant}`,
      ].join(" ")}
      style={style}
    >
      {label}
    </button>
  );
};
