"use client";

import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Icon,
  VStack,
  Link,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const ProfileCreationBanner = () => {
  return (
    <Box
      w="100%"
      p={5}
      borderRadius="2xl"
      bg={{
        base: "rgba(0, 0, 0, 0.03)",
        _dark: "rgba(255, 255, 255, 0.05)",
      }}
      border="1px solid"
      borderColor={{
        base: "rgba(0, 0, 0, 0.1)",
        _dark: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "row" }}
        justify="space-between"
        gap={4}
      >
        <Flex align="center" gap={4}>
          <Box
            p={3}
            bg="var(--reppy-green)"
            borderRadius="xl"
            color="black"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaUserCircle} boxSize={5} />
          </Box>

          <VStack align="start" gap={0.5}>
            <Heading fontSize="lg" color={{ base: "black", _dark: "white" }}>
              Set up your Reppy profile
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Customize your Fitness Experience with Reppy.
            </Text>
          </VStack>
        </Flex>

        <Link href="/register/create_profile" w={"100%"}>
          <Button
            w={"100%"}
            bg="var(--reppy-green)"
            color="black"
            fontWeight="bold"
            size="md"
            borderRadius="lg"
            _hover={{
              bg: "var(--reppy-green)",
              opacity: 0.9,
            }}
            transition="all 0.2s"
          >
            Create your profile
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default ProfileCreationBanner;
