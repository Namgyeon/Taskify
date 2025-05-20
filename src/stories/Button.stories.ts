import Button from "../components/ui/Button";

export default {
  title: "Test/Button",
  component: Button,
};

export const Text = {
  args: {
    text: "realButton",
  },
};

export const disabledTrue = {
  args: {
    text: "True",
    disabled: true,
  },
};

export const disabledFalse = {
  args: {
    text: "False",
    disabled: false,
  },
};
