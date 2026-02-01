"use client";

import useCheckProfile from "@/app/hooks/useCheckProfile";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  Badge,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { Flame, Calendar } from "lucide-react";
import Link from "next/link";

interface UserProfile {
  nickname: string;
  bio: string;
  gender: string;
  status_message: string;
  current_streak: number;
}

const hasProfile = {
  id: "u1",
  nickname: "Gymawy",
  bio: "Ana b7b aroo7 el gym kol youm. 💪 Fitness enthusiast",
  avatarUrl: "",
  followers: 1247,
  following: 389,
  posts: 156,
  totalWorkouts: 3,
  currentStreak: 15,
  joinedDate: "January 2025",
};

const ProfilePanel = () => {
  const hasProfile = useCheckProfile();

  if (hasProfile === null) return null;

  if (hasProfile === false) {
    return (
      <VStack
        h={"100%"}
        justify="center"
        align="center"
        py={10}
        px={5}
        gap={8}
        textAlign="center"
        w="100%"
      >
        <VStack gap={3}>
          <Heading size="xl" color="white">
            Profile Incomplete
          </Heading>
          <Text color="gray.500" fontSize="md" maxW="300px">
            Create your profile to track progress, save workouts, and see your
            stats.
          </Text>
        </VStack>

        <Button
          asChild
          bg="var(--reppy-green)"
          color="black"
          fontWeight="700"
          px={10}
          h="12"
          fontSize="md"
          borderRadius="5px"
          _hover={{
            opacity: 0.9,
            transform: "scale(1.05)",
          }}
          transition="all 0.2s"
        >
          <Link href="/register/create_profile">Create Profile</Link>
        </Button>
      </VStack>
    );
  }

  return (
    <VStack gap={6} align="stretch">
      <Card.Root
        bg="transparent"
        variant="outline"
        borderRadius="5px"
        overflow="hidden"
        border={"none"}
        borderEndRadius={0}
        borderTopRadius={0}
      >
        <Box
          h="150px"
          bg="linear-gradient(135deg, var(--reppy-green) 0%, #059669 100%)"
          position="relative"
          borderRadius="0px"
        />

        <Box px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
          <VStack gap={4} align="stretch">
            <Flex
              justify="space-between"
              align="end"
              mt="-50px"
              flexWrap="wrap"
              gap={4}
            >
              <Avatar.Root
                size="2xl"
                bg="var(--reppy-green)"
                color="black"
                border="4px solid"
                borderColor={{
                  base: "white",
                  _dark: "gray.900",
                }}
              >
                <Avatar.Fallback fontSize="2xl" fontWeight="bold">
                  {hasProfile.nickname.substring(0, 2).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
            </Flex>

            {/* User Info */}
            <VStack align="start">
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                color={{ base: "black", _dark: "white" }}
              >
                {hasProfile.nickname}
              </Heading>
              <Text fontSize="sm" color="gray.500" lineHeight="tall">
                {hasProfile.bio}
              </Text>
              <HStack gap={2} flexWrap="wrap">
                <Badge
                  variant="subtle"
                  colorPalette="green"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Flame size={12} />
                  {hasProfile.current_streak} day streak
                </Badge>
                <Badge
                  variant="subtle"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Calendar size={12} />
                  Joined {hasProfile.date_joined}
                </Badge>
              </HStack>
            </VStack>

            {/* Stats Row */}
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={{ base: 2, md: 4 }}
              pt={4}
              borderTopWidth="1px"
            >
              <GridItem>
                <VStack
                  gap={0}
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                  transition="opacity 0.2s"
                >
                  <Text
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="bold"
                    color="var(--reppy-green)"
                  >
                    {hasProfile.totalWorkouts || "-"}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
                    Posts
                  </Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack
                  gap={0}
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                  transition="opacity 0.2s"
                >
                  <Text
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="bold"
                    color="var(--reppy-green)"
                  >
                    {hasProfile.totalWorkouts || "-"}
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
                    Workouts
                  </Text>
                </VStack>
              </GridItem>
              <GridItem>
                <VStack
                  gap={0}
                  cursor="pointer"
                  _hover={{ opacity: 0.7 }}
                  transition="opacity 0.2s"
                >
                  <Text
                    fontSize={{ base: "lg", md: "2xl" }}
                    fontWeight="bold"
                    color="var(--reppy-green)"
                  >
                    -
                  </Text>
                  <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500">
                    Friends
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Box>
      </Card.Root>

      {/* <VStack align="start" px="15px">
        <Heading
          fontSize={{ base: "xl", md: "2xl" }}
          color={{ base: "black", _dark: "white" }}
        >
          Recent Posts
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Share your fitness journey
        </Text>
      </VStack>
      <Flex px={"15px"}>
        <VStack align="stretch" w={"100%"}>
          {MOCK_POSTS.map((post, index) => (
            <Card.Root
              w={"100%"}
              key={post.id}
              bg="transparent"
              variant="outline"
              borderRadius="5px"
            >
              <Box p={{ base: 4, md: 6 }}>
                <VStack align="stretch" gap={2}>
                  <Flex gap={3}>
                    <Avatar.Root
                      size="md"
                      bg="var(--reppy-green)"
                      color="black"
                    >
                      <Avatar.Fallback fontSize="sm" fontWeight="bold">
                        {hasProfile.nickname.substring(0, 2).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <VStack align="start" gap={0} flex={1}>
                      <Text fontSize="sm">{hasProfile.nickname}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {post.date}
                      </Text>
                    </VStack>
                  </Flex>
                  <Text fontSize="sm" lineHeight="tall">
                    {post.content}
                  </Text>

                  {post.workoutDetails && (
                    <Box
                      p={3}
                      borderRadius="lg"
                      bg="gray.50"
                      _dark={{ bg: "whiteAlpha.50" }}
                    >
                      <HStack justify="space-between" wrap="wrap" gap={2}>
                        <HStack gap={2}>
                          <Dumbbell size={16} color="var(--reppy-green)" />
                          <Text fontSize="xs" fontWeight="bold">
                            {post.workoutDetails.name}
                          </Text>
                        </HStack>
                        <HStack gap={4} fontSize="xs" color="gray.500">
                          <HStack gap={1}>
                            <TrendingUp size={12} />
                            <Text>{post.workoutDetails.duration} mins</Text>
                          </HStack>
                          <HStack gap={1}>
                            <Flame size={12} />
                            <Text>{post.workoutDetails.calories} cal</Text>
                          </HStack>
                        </HStack>
                      </HStack>
                    </Box>
                  )}
                  <Flex gap={6} pt={2} borderTopWidth="1px">
                    <HStack
                      gap={2}
                      fontSize="sm"
                      color="gray.500"
                      cursor="pointer"
                      _hover={{ color: "var(--reppy-green)" }}
                      transition="color 0.2s"
                    >
                      <Heart size={18} />
                      <Text>{post.likes}</Text>
                    </HStack>
                    <HStack
                      gap={2}
                      fontSize="sm"
                      color="gray.500"
                      cursor="pointer"
                      _hover={{ color: "var(--reppy-green)" }}
                      transition="color 0.2s"
                    >
                      <MessageCircle size={18} />
                      <Text>{post.comments}</Text>
                    </HStack>
                  </Flex>
                </VStack>
              </Box>
            </Card.Root>
          ))}
        </VStack>
      </Flex> */}
    </VStack>
  );
};

export default ProfilePanel;
