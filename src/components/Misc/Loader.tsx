"use client";

import { Flex, VStack, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      position="fixed"
      inset={0}
      align="center"
      justify="center"
      zIndex={9999}
      overflow="hidden"
    >
      <VStack gap={5} position="relative" zIndex={1}>
        <Spinner
          animationDuration="0.3s"
          size="xl"
          color="var(--reppy-green)"
        />
      </VStack>
    </Flex>
  );
};

export default Loader;
