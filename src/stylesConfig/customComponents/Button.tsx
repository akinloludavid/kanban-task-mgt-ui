export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    outline: "none",
    _focus: { boxShadow: "none" },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props: any) => ({
      bg: "btnBgColor",
      fontSize: "15px",
      fontWeight: "300",
      lineHeight: "19px",
      borderRadius: "6px",
      color: "white",
      width: "336px",
      _hover: {
        bg: "white",
        color: "#161d2f",
      },
      "@media (max-width:480px)": {
        maxWidth: "279px",
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
  },
};
