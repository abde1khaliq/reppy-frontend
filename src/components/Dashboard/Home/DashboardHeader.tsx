"use client";

import {
  Flex,
  Avatar,
  Box,
  Heading,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";

const DashboardHeader = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box py={2} px={4}>
      <Flex justifyContent="space-between" align="center" gap={4}>
        {!isMobile ? (
          <Heading color="var(--reppy-green)" size="xl">
            Reppy
          </Heading>
        ) : (
          <Image
            src="https://i.postimg.cc/dQ5MF6zW/reppy-Logo-New-noshdw.png"
            alt="Reppy Logo"
            w="30px"
            h="30px"
            objectFit="contain"
          />
        )}
        <Box py={1}>
          <Avatar.Root>
            <Avatar.Image src="https://i.postimg.cc/DyYVf7yQ/pose1.png" />
            <Avatar.Fallback>R</Avatar.Fallback>
          </Avatar.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
