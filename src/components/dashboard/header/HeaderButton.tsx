import { ButtonHTMLAttributes } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

// 대쉬보드 생성기능 완료 후 작업
const HeaderButton = ({ children }: HeaderButtonProps) => {
  return <button className="">{children}</button>;
};

export default HeaderButton;
