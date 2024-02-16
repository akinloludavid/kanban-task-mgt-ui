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
    initialColorMode: 'system',
    useSystemColorMode: true,
    fonts: {
        heading: 'Plus Jakarta Sans Variable, sans-serif',
        body: 'Plus Jakarta Sans Variable, sans-serif',
    },
    components,
    colors,
})
