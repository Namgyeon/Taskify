import Input from "../components/ui/Input";

export default {
  title: "Test/Input",
  component: Input,
};

export const Basic = {
  args: {
    label: "아이디",
    placeholder: "아이디를 입력해주세요.",
  },
};

export const ErrorState = {
  args: {
    label: "아이디",
    placeholder: "아이디를 입력해주세요.",
    error: true,
    errorMessage: "중복된 아이디입니다.",
  },
};
