import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export default async function RegisterationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        w="60%"
        h="60%"
        bg="radial-gradient(circle, var(--reppy-green) 0%, transparent 70%)"
        filter="blur(120px)"
        opacity={{ base: 0, _dark: 0.2 }}
        zIndex={0}
      />

      <Flex
        minH="100vh"
        align="center"
        justify="center"
        position="relative"
        zIndex={1}
        py={{ base: 6, md: 10 }}
      >
        <Container maxW="480px" px={{ base: 5, md: 6 }}>
          <Box bg="transparent" borderRadius="xl" p={{ base: 6, md: 8 }}>
            <VStack gap={5} align="stretch">
              {/* Logo */}
              <Flex justify="center" mb={1}>
                <Image
                  src="https://i.postimg.cc/wvwc9sBS/reppy-Title-Sized-No-Bg.png"
                  alt="Reppy Logo"
                  h={{ base: "50px", md: "50px" }}
                  objectFit="contain"
                />
              </Flex>
              {children}
            </VStack>
          </Box>
        </Container>
      </Flex>
    </Box>
  );
}
