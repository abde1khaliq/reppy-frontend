"use client";

import {
  GridItem,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Box,
} from "@chakra-ui/react";
import { GiCaptainHatProfile } from "react-icons/gi";

const AIStrategyCard = () => {
  const reppyGreen = "var(--reppy-green)";

  return (
    <GridItem
      borderRadius="5px"
      border="1px solid"
      borderColor="whiteAlpha.200"
      bgGradient="linear(to-br, gray.900, blackAlpha.900)"
      px={4}
      py={3}
      minH="180px"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top="-20%"
        right="-20%"
        boxSize="180px"
        bg={reppyGreen}
        opacity="0.15"
        filter="blur(60px)"
        zIndex="0"
      />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        zIndex="1"
      >
        <VStack align="start" gap={2} flex="1">
          {/* Top Label */}
          <Flex align="center" gap={2}>
            <GiCaptainHatProfile color={reppyGreen} size="14px" />
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={reppyGreen}
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Your Personal Trainer
            </Text>
          </Flex>

          <Heading size="2xl" lineHeight="1.1">
            Agent Training Advice
          </Heading>

          <Text color="gray.600" fontSize="sm" maxW="90%">
            Recommended: High-intensity HIIT for fat burn and cardio health.
          </Text>
          <Button
            bg={reppyGreen}
            color="black"
            size="sm"
            h="35px"
            mt={1}
          >
            Thank you, Assistant
          </Button>
        </VStack>

        <Box pr={5}>
          <GiCaptainHatProfile
            size="50px"
            color="var(--reppy-green-hightlight)"
            style={{ opacity: 0.2 }}
          />
        </Box>
      </Flex>
    </GridItem>
  );
};

export default AIStrategyCard;
