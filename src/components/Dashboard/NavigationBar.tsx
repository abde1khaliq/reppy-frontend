"use client";

import {
  Box,
  IconButton,
  VStack,
  Image,
  Icon,
  useBreakpointValue,
  HStack,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import {
  FaHome,
  FaDumbbell,
  FaUser,
  FaCog,
  FaUserFriends,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const menuItems = [
    {
      id: "home",
      icon: FaHome,
      label: "Home",
      tooltip: "Dashboard Home",
      href: "/dashboard",
    },
    {
      id: "workouts",
      icon: FaDumbbell,
      label: "Workouts",
      tooltip: "My Workouts",
      href: "/dashboard/workouts",
    },
    {
      id: "profile",
      icon: FaUser,
      label: "Profile",
      tooltip: "My Profile",
      href: "/dashboard/profile",
    },
    {
      id: "settings",
      icon: FaCog,
      label: "Settings",
      tooltip: "Settings",
      href: "/dashboard/settings",
    },
    {
      id: "friends",
      icon: FaUserFriends,
      label: "Friends",
      tooltip: "Friends",
      href: "/dashboard/friends",
    },
  ];

  if (isMobile) {
    return (
      <Box
        position="fixed"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        bg="white"
        _dark={{ bg: "rgba(0,0,0,0.7)" }}
        borderRadius="full"
        px={4}
        py={2}
        shadow="lg"
        backdropFilter="blur(10px)"
        zIndex={20}
      >
        <HStack>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip
                key={item.id}
                content={item.tooltip}
                positioning={{ placement: "top" }}
              >
                <Link href={item.href}>
                  <IconButton
                    aria-label={item.label}
                    size="md"
                    variant="ghost"
                    borderRadius="full"
                    bg="transparent"
                  >
                    <Icon
                      as={item.icon}
                      boxSize={5}
                      color={isActive ? "var(--reppy-green)" : "gray.600"}
                    />
                  </IconButton>
                </Link>
              </Tooltip>
            );
          })}
        </HStack>
      </Box>
    );
  }

  return (
    <Box
      w="70px"
      bg={{ base: "white", _dark: "rgba(0,0,0,0.5)" }}
      borderRight="1px solid"
      borderColor={{ base: "gray.200", _dark: "rgba(255,255,255,0.1)" }}
      backdropFilter="blur(10px)"
      py={6}
    >
      <VStack h="100%" justify="space-between" align="center" gap={0}>
        <VStack gap={6} w="100%">
          <Box>
            <Image
              src="https://i.postimg.cc/dQ5MF6zW/reppy-Logo-New-noshdw.png"
              alt="Reppy Logo"
              w="30px"
              h="35px"
              objectFit="contain"
            />
          </Box>

          <VStack w="100%" gap={0}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip
                  key={item.id}
                  content={item.tooltip}
                  positioning={{ placement: "right" }}
                >
                  <Link
                    href={item.href}
                    style={{ display: "block", width: "100%" }}
                  >
                    <IconButton
                      aria-label={item.label}
                      size="lg"
                      variant="ghost"
                      w="100%"
                      h="56px"
                      borderRadius={0}
                      bg="transparent"
                      borderRight="2px solid"
                      borderRightColor={
                        isActive ? "var(--reppy-green)" : "black"
                      }
                    >
                      <Icon
                        as={item.icon}
                        boxSize={5}
                        color={isActive ? "var(--reppy-green)" : "gray.600"}
                      />
                    </IconButton>
                  </Link>
                </Tooltip>
              );
            })}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SideBar;
