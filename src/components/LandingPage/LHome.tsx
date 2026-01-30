"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Image,
  Container,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { motion } from "framer-motion";
import Header from "./Header";

const MotionBox = motion.create(Box);
const MotionHeading = motion.create(Heading);
const MotionText = motion.create(Text);
const MotionLink = motion.create(Link);
const MotionImage = motion.create(Image);

const LHome = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Header />
      <Box
        position="relative"
        minH="100vh"
        overflow="hidden"
        bg={{ base: "white", _dark: "#000000" }}
      >
        {/* Background container */}
        <MotionBox
          position="absolute"
          inset={0}
          zIndex={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Sporty stripes */}
          <Box
            position="absolute"
            inset={0}
            backgroundImage="repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.05) 4px, transparent 4px, transparent 40px)"
            backgroundSize="40px 40px"
            opacity={0.4}
          />

          {/* Ambient glow */}
          <MotionBox
            position="absolute"
            top="-20%"
            left="-20%"
            w="60%"
            h="60%"
            bg="radial-gradient(circle, var(--reppy-green) 0%, transparent 70%)"
            filter="blur(120px)"
            opacity={0.2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </MotionBox>

        {/* Foreground content */}
        <Flex
          minH="100vh"
          align="center"
          position="relative"
          zIndex={2}
          py={{ base: 0, md: 0 }}
          pt={{ base: "100px", md: 0 }}
        >
          <Container maxW="container.xl" px={{ base: 6, md: 8 }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="space-between"
              gap={{ base: 8, md: 12 }}
            >
              {/* Hero Text */}
              <VStack
                textAlign={{ base: "center", md: "left" }}
                align={{ base: "center", md: "start" }}
                maxW={{ base: "100%", md: "700px" }}
                flex={1}
              >
                <MotionHeading
                  fontFamily="var(--font-poppins)"
                  fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "7xl" }}
                  fontWeight="extrabold"
                  lineHeight="shorter"
                  color={{ base: "black", _dark: "white" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Planning{" "}
                  <Text as="span" color="var(--reppy-green)">
                    Workouts
                  </Text>{" "}
                  could not get any easier.
                </MotionHeading>

                <MotionText
                  fontFamily="var(--font-poppins)"
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.400"
                  lineHeight="tall"
                  maxW={{ base: "100%", md: "90%" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  Reppy is an all-in-one fitness application packed with
                  features to boost your health and productivity.
                </MotionText>

                {/* CTA Buttons */}
                <MotionBox
                  pt={4}
                  w={{ base: "100%", sm: "auto" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <HStack
                    w={{ base: "100%", sm: "auto" }}
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <MotionLink
                      as={NextLink}
                      href="/login"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      px={6}
                      py={3}
                      borderRadius="md"
                      bg={{
                        base: "gray.100",
                        _dark: "rgba(255, 255, 255, 0.1)",
                      }}
                      color={{ base: "black", _dark: "white" }}
                      fontWeight={600}
                      fontSize="14px"
                      fontFamily="var(--font-poppins)"
                      textAlign="center"
                      w={{ base: "100%", sm: "auto" }}
                      minW={{ sm: "90px" }}
                      transition={{ duration: 0.2 }}
                      _hover={{
                        base: { bg: "gray.200" },
                        _dark: { bg: "rgba(255, 255, 255, 0.15)" },
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </MotionLink>

                    <MotionLink
                      as={NextLink}
                      href="/register"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      px={6}
                      py={3}
                      borderRadius="md"
                      bg={{ base: "black", _dark: "white" }}
                      color={{ base: "white", _dark: "black" }}
                      fontWeight={700}
                      fontSize="14px"
                      fontFamily="var(--font-poppins)"
                      textAlign="center"
                      w={{ base: "100%", sm: "auto" }}
                      minW={{ sm: "160px" }}
                      transition={{ duration: 0.2 }}
                      _hover={{
                        _dark: { bg: "gray.200" },
                        base: { bg: "gray.900" },
                        textDecoration: "none",
                      }}
                    >
                      Create Account
                    </MotionLink>
                  </HStack>
                </MotionBox>
              </VStack>

              {/* Phone Mockup Image */}
              <MotionBox
                flex={{ base: "0 0 auto", md: "0 0 300px" }}
                w={{ base: "100%", md: "auto" }}
                maxW={{ base: "250px", md: "500px" }}
                mx={{ base: "auto", md: 0 }}
                mt={{ base: "40px", md: 0 }}
                py={20}
                initial={{ opacity: 0, x: 50, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {!isMobile ? (
                  <MotionImage
                    src="https://i.postimg.cc/5Nw15h2X/Phone-Mockup.png"
                    alt="Reppy Phone Mockup"
                    w="100%"
                    h="auto"
                    scale={1.2}
                    objectFit="contain"
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <MotionImage
                    src="https://i.postimg.cc/RCWw0RVk/Phone-Mockup3.png"
                    alt="Reppy Phone Mockup"
                    w="100%"
                    h="auto"
                    scale={1.3}
                    objectFit="contain"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </MotionBox>
            </Flex>
          </Container>
        </Flex>
      </Box>
    </>
  );
};

export default LHome;
