import { Box, Container, Flex, VStack, Image } from "@chakra-ui/react";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
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
                  h={{ base: "40px", md: "50px" }}
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
