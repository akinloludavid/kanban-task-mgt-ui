export const TextStyle = {
  // style object for base or default style
  baseStyle: {
    color: "#ffffff",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    mainText: {
      fontSize: "15px",
      fontWeight: "300",
      lineHeight: "19px",
    },
    lightText: {
      fontSize: "13px",
      fontWeight: "300",
      lineHeight: "17px",
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
  },
};
