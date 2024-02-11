import { Box } from "@chakra-ui/react";
import { IChildren } from "../../types";

const PageLayout = ({ children }: IChildren) => {
  return <Box>{children}</Box>;
};

export default PageLayout;
