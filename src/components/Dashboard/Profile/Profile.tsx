"use client";

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
} from "@chakra-ui/react";
import {
  Flame,
  Calendar,
  Dumbbell,
  Heart,
  MessageCircle,
  TrendingUp,
} from "lucide-react";

interface Post {
  id: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  workoutDetails?: {
    name: string;
    duration: number;
    calories: number;
  };
}

const MOCK_USER = {
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

const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    content: "Just crushed on bench press! 100kg for 5 reps 🔥💪",
    date: "2 hours ago",
    likes: 43,
    comments: 8,
  },
];

const ProfilePanel = () => {
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
                  {MOCK_USER.nickname.substring(0, 2).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
            </Flex>

            {/* User Info */}
            <VStack align="start">
              <Heading
                fontSize={{ base: "xl", md: "2xl" }}
                color={{ base: "black", _dark: "white" }}
              >
                {MOCK_USER.nickname}
              </Heading>
              <Text fontSize="sm" color="gray.500" lineHeight="tall">
                {MOCK_USER.bio}
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
                  {MOCK_USER.currentStreak} day streak
                </Badge>
                <Badge
                  variant="subtle"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Calendar size={12} />
                  Joined {MOCK_USER.joinedDate}
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
                    {MOCK_USER.totalWorkouts}
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
                    {MOCK_USER.totalWorkouts}
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
                    5
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

      <VStack align="start" px="15px">
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
                  {/* Post Header */}
                  <Flex gap={3}>
                    <Avatar.Root
                      size="md"
                      bg="var(--reppy-green)"
                      color="black"
                    >
                      <Avatar.Fallback fontSize="sm" fontWeight="bold">
                        {MOCK_USER.nickname.substring(0, 2).toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <VStack align="start" gap={0} flex={1}>
                      <Text fontSize="sm">{MOCK_USER.nickname}</Text>
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
      </Flex>
    </VStack>
  );
};

export default ProfilePanel;
