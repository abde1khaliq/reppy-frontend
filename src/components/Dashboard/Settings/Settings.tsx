"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
  Card,
  CardBody,
  Flex,
  Button,
  Separator,
} from "@chakra-ui/react";
import LogoutDialog from "./LogoutDialogue";

const SettingsPanel = () => {
  return (
    <Box position="relative">
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 6 }}
        position="relative"
        zIndex={1}
      >
        <Box mb={8}>
          <VStack align="start" gap={1}>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={{ base: "black", _dark: "white" }}
            >
              Settings
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Customize your Reppy experience
            </Text>
          </VStack>
        </Box>

        {/* Settings Sections */}
        <VStack gap={2} align="stretch">
          {/* Appearance Section */}
          <Card.Root bg={{ _dark: "black" }} border={"none"}>
            <CardBody p={{ base: 2, md: 6 }}>
              <VStack gap={5} align="stretch">
                <HStack gap={3}>
                  <Heading
                    fontSize="lg"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Appearance
                  </Heading>
                </HStack>

                <Separator />

                <VStack gap={4} align="stretch">
                  <Box>
                    <Flex justify="space-between" align="start" gap={4}>
                      <VStack align="start" gap={1} flex={1}>
                        <Text
                          fontWeight="600"
                          fontSize="sm"
                          color={{ base: "black", _dark: "white" }}
                        >
                          Theme
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Choose your preferred theme
                        </Text>
                      </VStack>

                      <HStack gap={2}>
                        <Button
                          size="sm"
                          variant="outline"
                          bg="transparent"
                          color={{ base: "black", _dark: "white" }}
                          borderColor={{
                            base: "gray.300",
                            _dark: "rgba(255,255,255,0.2)",
                          }}
                          _hover={{ opacity: 0.8 }}
                        >
                          Light
                        </Button>
                        <Button
                          size="sm"
                          variant="solid"
                          color="black"
                          _hover={{ opacity: 0.8 }}
                        >
                          Dark
                        </Button>
                      </HStack>
                    </Flex>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card.Root>

          <Card.Root bg={{ _dark: "black" }} border={"none"}>
            <CardBody p={{ base: 2, md: 6 }}>
              <VStack gap={5} align="stretch">
                <HStack gap={3}>
                  <Heading
                    fontSize="lg"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Units & Measurements
                  </Heading>
                </HStack>

                <Separator />

                <VStack gap={4} align="stretch">
                  <Box>
                    <Flex justify="space-between" align="start" gap={4}>
                      <VStack align="start" gap={1} flex={1}>
                        <Text
                          fontWeight="600"
                          fontSize="sm"
                          color={{ base: "black", _dark: "white" }}
                        >
                          Weight Unit
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Choose between kilograms and pounds
                        </Text>
                      </VStack>

                      <HStack gap={2}>
                        <Button
                          size="sm"
                          variant="solid"
                          bg="var(--reppy-green)"
                          color="black"
                          borderColor="var(--reppy-green)"
                          minW="60px"
                          _hover={{ opacity: 0.8 }}
                        >
                          KG
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          bg="transparent"
                          color={{ base: "black", _dark: "white" }}
                          borderColor={{
                            base: "gray.300",
                            _dark: "rgba(255,255,255,0.2)",
                          }}
                          minW="60px"
                          _hover={{ opacity: 0.8 }}
                        >
                          LBS
                        </Button>
                      </HStack>
                    </Flex>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card.Root>

          {/* Account Section */}
          <Card.Root bg={{ _dark: "black" }} border={"none"}>
            <CardBody p={{ base: 2, md: 6 }}>
              <VStack gap={5} align="stretch">
                <HStack gap={3}>
                  <Heading
                    fontSize="lg"
                    color={{ base: "black", _dark: "white" }}
                  >
                    Account
                  </Heading>
                </HStack>

                <Separator />

                <VStack gap={2} align="stretch">
                  <Button
                    variant="outline"
                    justifyContent="flex-start"
                    borderColor={{
                      base: "gray.300",
                      _dark: "rgba(255,255,255,0.2)",
                    }}
                    color={{ base: "black", _dark: "white" }}
                  >
                    Manage Account
                  </Button>
                  <LogoutDialog />

                  <Button
                    variant="outline"
                    justifyContent="flex-start"
                    borderColor="red.500"
                    color="red.500"
                    _hover={{
                      bg: "red.50",
                      _dark: { bg: "rgba(239, 68, 68, 0.1)" },
                    }}
                  >
                    Delete Account
                  </Button>
                </VStack>
              </VStack>
            </CardBody>
          </Card.Root>
        </VStack>
      </Container>
    </Box>
  );
};

export default SettingsPanel;
