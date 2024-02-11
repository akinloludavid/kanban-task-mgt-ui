import { Heading } from "@chakra-ui/react";
import React, { Suspense } from "react";

const LazyLoader = () => {
  return <Heading>Loading...</Heading>;
};
const WithSuspense = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default WithSuspense;
