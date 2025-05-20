import PasswordInput from "@/components/ui/PasswordInput";

export default {
  title: "Test/PasswordInput",
  component: PasswordInput,
  args: {
    label: "비밀번호",
  },
};

export const Default = {};

export const ErrorState = {
  args: {
    error: true,
    errorMessage: "비밀번호는 8자이상이여야 합니다.",
  },
};
