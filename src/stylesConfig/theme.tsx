import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./customComponents/Button";
import { TextStyle as Text } from "./customComponents/Text";
import { HeadingStyle as Heading } from "./customComponents/Heading";
import { InputStyles as Input } from "./customComponents/Input";
import { colors } from "./customComponents/colors";
const components = {
  Button,
  Text,
  Heading,
  Input,
};
export const customTheme = extendTheme({
  fonts: {
    heading: "Outfit, sans-serif",
    body: "Outfit, sans-serif",
  },
  components,
  colors,
});
