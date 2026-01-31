"use client";

import {
  GridItem,
  Heading,
  Text,
  Flex,
  VStack,
  Box,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { useSession } from "next-auth/react";

const FireEffect = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box position="relative" display="inline-block">
      <style jsx global>{`
        @keyframes scaleUpDown {
          0%,
          100% {
            transform: scaleY(1) scaleX(1);
          }
          50%,
          90% {
            transform: scaleY(1.1);
          }
          75% {
            transform: scaleY(0.95);
          }
          80% {
            transform: scaleX(0.95);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: skewX(0) scale(1);
          }
          50% {
            transform: skewX(5deg) scale(0.9);
          }
        }
        @keyframes particleUp {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            top: -100%;
            transform: scale(0.5);
          }
        }
        @keyframes glow {
          0%,
          100% {
            background-color: #ef5a00;
          }
          50% {
            background-color: #ff7800;
          }
        }

        .fire-container {
          position: absolute;
          top: 60%;
          left: 30%; /* Adjust to sit behind the number */
          width: 120px;
          height: 120px;
          z-index: -1;
        }

        .fire-part {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .main-fire {
          position: absolute;
          transform: scaleX(0.8) rotate(45deg);
          border-radius: 0 40% 60% 40%;
          filter: drop-shadow(0 0 10px #d43322);
        }

        .particle-fire {
          position: absolute;
          background-color: #ef5a00;
          border-radius: 50%;
          filter: drop-shadow(0 0 10px #d43322);
          animation: particleUp 2s ease-out infinite both;
        }

        .fire-center {
          animation: scaleUpDown 3s ease-out infinite both;
        }
        .fire-center .main-fire {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
            farthest-corner at 10px 0,
            #d43300 0%,
            #ef5a00 95%
          );
        }

        .fire-right {
          animation: shake 2s ease-out infinite both;
        }
        .fire-right .main-fire {
          top: 15%;
          right: -25%;
          width: 80%;
          height: 80%;
          background-color: #ef5a00;
        }

        .fire-left {
          animation: shake 3s ease-out infinite both;
        }
        .fire-left .main-fire {
          top: 15%;
          left: -20%;
          width: 80%;
          height: 80%;
          background-color: #ef5a00;
        }

        .fire-bottom .main-fire {
          top: 30%;
          left: 20%;
          width: 75%;
          height: 75%;
          background-color: #ff7800;
          filter: blur(10px);
          animation: glow 2s ease-out infinite both;
        }
      `}</style>

      <div className="fire-container">
        <div className="fire-left fire-part">
          <div className="main-fire"></div>
          <div
            className="particle-fire"
            style={{ top: "10%", left: "20%", width: "10px", height: "10px" }}
          ></div>
        </div>
        <div className="fire-center fire-part">
          <div className="main-fire"></div>
          <div
            className="particle-fire"
            style={{ top: "60%", left: "45%", width: "10px", height: "10px" }}
          ></div>
        </div>
        <div className="fire-right fire-part">
          <div className="main-fire"></div>
          <div
            className="particle-fire"
            style={{ top: "45%", left: "50%", width: "15px", height: "15px" }}
          ></div>
        </div>
        <div className="fire-bottom fire-part">
          <div className="main-fire"></div>
        </div>
      </div>
      {children}
    </Box>
  );
};

const StreakCard = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState<string>("");
  const streakDays = 25;
  const fireOrange = "#FF3D00";

  useEffect(() => {
    async function getUser() {
      if (!session?.accessToken) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/users/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${session.accessToken}`,
            },
          },
        );
        const data = await res.json();
        setUsername(data.username);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    getUser();
  }, [session]);

  return (
    <GridItem
      borderRadius="5px"
      border="1px solid"
      borderColor="whiteAlpha.200"
      bgGradient="linear(to-br, gray.900, blackAlpha.900)"
      px={4}
      py={4}
      minH="180px"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top="-20%"
        right="-10%"
        boxSize="200px"
        bg={fireOrange}
        opacity="0.1"
        filter="blur(70px)"
        zIndex="0"
      />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        zIndex="1"
      >
        <VStack align="start" flex="1">
          <Flex align="center" gap={2}>
            <FaFire color={fireOrange} size="16px" />
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={fireOrange}
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Current Streak
            </Text>
          </Flex>

          <Heading size="lg" lineHeight="1.2">
            You're on fire,{" "}
            <Text as="span" color={fireOrange}>
              {username || "Champion"}
            </Text>
          </Heading>

          <Text color="gray.400" fontSize="sm" maxW="80%">
            Keep the momentum. Hit today's goal to reach day {streakDays + 1}.
          </Text>

          <Button
            bg={fireOrange}
            _hover={{ bg: "#e63600" }}
            color="white"
            size="sm"
            mt={2}
          >
            Start Your next Workout
          </Button>
        </VStack>

        <Box>
          <FireEffect>
            <Heading
            px={5}
              fontSize={{ base: "80px", md: "100px" }}
              fontWeight="900"
              lineHeight="1"
              color="white"
              userSelect="none"
              textShadow={`0 0 30px ${fireOrange}`}
            >
              {streakDays}
            </Heading>
          </FireEffect>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default StreakCard;
