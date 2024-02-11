// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/components/input.ts

const search = {
  field: {
    caretColor: "#fc4747",
    borderRadius: "none",
    paddingBottom: "15px",
    border: "none",
    outline: "none",
    bgColor: "transparent",
    fontSize: "24px",
    fontWeight: "300",
    lineHeight: "30px",
    w: ["100%"],
    color: "#fff",
    _placeholder: {
      color: "#fff",
      opacity: 0.5,
      fontSize: ["16px", "24px"],
      fontWeight: "300",
      lineHeight: "30px",
    },
    _focus: {
      borderBottom: "1px solid #5A698F",
    },
  },
};
const primary = {
  field: {
    caretColor: "#fc4747",
    borderRadius: "none",
    paddingBottom: "18px",
    border: "none",
    borderBottom: "1px solid #5A698F",
    bgColor: "transparent",
    fontSize: "15px",
    fontWeight: "300",
    lineHeight: "30px",
    color: "#fff",
    _placeholder: {
      color: "#fff",
      opacity: 0.5,
      fontSize: "15px",
      fontWeight: "300",
      lineHeight: "30px",
    },
    _focus: {
      border: "none",
      borderBottom: "1px solid #ffffff",
    },
  },
};
export const InputStyles = {
  baseStyle: {},
  variants: {
    search,
    primary,
  },
  defaultProps: {
    variant: "primary",
  },
};
