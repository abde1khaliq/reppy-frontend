"use client";

import { Box, Flex, HStack, Link, Image, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ColorModeButton } from "../ui/color-mode";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionLink = motion.create(Link);
const MotionButton = motion.create(Button);

const Header = () => {
  return (
    <MotionBox
      position="fixed"
      zIndex={10}
      as="header"
      w="full"
      py={{ base: 3, md: 4 }}
      display="flex"
      justifyContent="center"
      px={{ base: 4, md: 0 }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionFlex
        style={{ fontFamily: "var(--font-poppins)" }}
        as="nav"
        align="center"
        justify="space-between"
        w="full"
        maxW="4xl"
        px={{ base: 4, md: 6 }}
        py={{ base: 2, md: 3 }}
        bg={{ base: "rgba(255, 255, 255, 0.9)", _dark: "rgba(0, 0, 0, 0.4)" }}
        color="white"
        rounded="full"
        shadow="lg"
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo Section */}
        <MotionBox
          display="flex"
          alignItems="center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            src="https://i.postimg.cc/dQ5MF6zW/reppy-Logo-New-noshdw.png"
            alt="Reppy-Logo"
            rounded="md"
            h={{ base: "24px", md: "30px" }}
            w={{ base: "24px", md: "30px" }}
            fit="contain"
          />
        </MotionBox>

        {/* Navigation Links - Hidden on mobile */}
        <HStack
          spaceX={{ base: 4, md: 8 }}
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="medium"
          display={{ base: "none", md: "flex" }}
        >
          <MotionLink
            href="#features"
            color={{ base: "black", _dark: "white" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            _hover={{ color: "var(--reppy-green)", textDecoration: "none" }}
          >
            Features
          </MotionLink>
          <MotionLink
            href="#support"
            color={{ base: "black", _dark: "white" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            _hover={{ color: "var(--reppy-green)", textDecoration: "none" }}
          >
            Support
          </MotionLink>
          <MotionLink
            href="#community"
            color={{ base: "black", _dark: "white" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            _hover={{ color: "var(--reppy-green)", textDecoration: "none" }}
          >
            Community
          </MotionLink>
        </HStack>

        {/* Call to Action */}
        <MotionFlex
          gap={2}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ColorModeButton />
          <MotionButton
            rounded="full"
            bg={{ base: "black", _dark: "white" }}
            color={{ base: "white", _dark: "black" }}
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="semibold"
            px={{ base: 4, md: 6 }}
            size={{ base: "xs", md: "sm" }}
            transition={{ duration: 0.2 }}
            _hover={{
              _dark: { bg: "gray.200" },
              base: { bg: "gray.900" },
            }}
          >
            Download App
          </MotionButton>
        </MotionFlex>
      </MotionFlex>
    </MotionBox>
  );
};

export default Header;
