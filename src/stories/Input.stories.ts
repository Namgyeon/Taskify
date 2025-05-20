import Input from "../components/ui/Input";

export default {
  title: "Test/Input",
  component: Input,
};

export const OriginInput = {
  args: {
    label: "아이디",
    placeholder: "아이디를 입력해주세요.",
  },
};

export const ErrorInput = {
  args: {
    label: "아이디",
    placeholder: "아이디를 입력해주세요.",
    error: true,
    errorMessage: "중복된 아이디입니다.",
  },
};
