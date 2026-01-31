"use client";

import useWorkouts from "@/app/hooks/useWorkouts";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  Badge,
  Flex,
  Container,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Pencil, Play, Timer, Target } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MotionCard = motion.create(Card.Root);
const MotionBox = motion.create(Box);

const UserWorkouts = () => {
  const { data: session } = useSession();
  const { workouts, loading } = useWorkouts(session);

  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const handleCreateWorkout = () => {
    console.log("Create new workout");
  };

  const handleEditWorkout = (e: React.MouseEvent, workoutId: number) => {
    e.stopPropagation();
    console.log("Edit workout:", workoutId);
  };

  const handleStartWorkout = (e: React.MouseEvent, workoutId: number) => {
    e.stopPropagation();
    console.log("Start workout:", workoutId);
  };

  const toggleWorkout = (workoutId: number) => {
    setSelectedWorkout(selectedWorkout === workoutId ? null : workoutId);
  };

  return (
    <Box>
      <Container>
        {/* Header */}
        <Flex
          justify="space-between"
          align="center"
          mb={8}
          flexWrap="wrap"
          gap={4}
        >
          <VStack align="start" gap={1}>
            <Heading
              fontSize={{ base: "2xl", md: "3xl" }}
              color={{ base: "black", _dark: "white" }}
            >
              My Workouts
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {workouts?.length || 0} workout{workouts?.length !== 1 ? "s" : ""}{" "}
              created
            </Text>
          </VStack>

          <Button
            bg="var(--reppy-green)"
            color="black"
            size={{ base: "md", md: "lg" }}
            _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
            onClick={handleCreateWorkout}
          >
            Create Workout
          </Button>
        </Flex>

        {/* Workouts Grid */}
        {loading ? (
          <Flex justify="center" align="center" minH="200px">
            <Spinner size="xl" color="var(--reppy-green)" />
          </Flex>
        ) : workouts?.length === 0 ? (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            textAlign="center"
            py={12}
          >
            <Dumbbell size={48} color="gray" style={{ margin: "0 auto" }} />
            <Heading fontSize="xl" color="gray.500" mt={4}>
              No workouts yet
            </Heading>
            <Text fontSize="sm" color="gray.400" mt={2}>
              Create your first workout to get started
            </Text>
          </MotionBox>
        ) : (
          <VStack gap={4} align="stretch">
            {workouts?.map((workout) => (
              <MotionCard
                layout
                key={workout.id}
                bg={"transparent"}
                variant="outline"
                borderRadius={"5px"}
                cursor="pointer"
                onClick={() => toggleWorkout(workout.id)}
                transition={{
                  layout: { duration: 0.4, type: "spring", bounce: 0.2 },
                }}
                style={{ overflow: "hidden" }}
              >
                <CardBody p={{ base: 4, md: 6 }}>
                  <Flex justify="space-between" align="center">
                    <HStack gap={4}>
                      <Box borderRadius="lg">
                        <Dumbbell size={22} color="var(--reppy-green)" />
                      </Box>
                      <VStack align="start" gap={0}>
                        <Heading truncate maxW={"120px"} size="sm">
                          {workout.title}
                        </Heading>
                        <Text fontSize="xs" color="gray.500">
                          {workout.exercises?.length || 0} exercises
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack gap={2}>
                      <Button
                        size="sm"
                        bg="var(--reppy-green)"
                        color="black"
                        _hover={{ bg: "var(--reppy-green)", opacity: 0.9 }}
                        onClick={(e) => handleStartWorkout(e, workout.id)}
                      >
                        Start
                      </Button>
                      <IconButton
                        aria-label="Edit workout"
                        variant="ghost"
                        size="sm"
                        borderRadius="full"
                        onClick={(e) => handleEditWorkout(e, workout.id)}
                        _hover={{
                          bg: "gray.100",
                          _dark: { bg: "whiteAlpha.200" },
                        }}
                      >
                        <Pencil size={16} />
                      </IconButton>
                    </HStack>
                  </Flex>

                  <AnimatePresence initial={false}>
                    {selectedWorkout === workout.id && (
                      <MotionBox
                        key={`content-${workout.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              type: "spring",
                              bounce: 0,
                              duration: 0.4,
                            },
                            opacity: { duration: 0.2, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              type: "spring",
                              bounce: 0,
                              duration: 0.3,
                            },
                            opacity: { duration: 0.2 },
                          },
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <VStack
                          gap={3}
                          align="stretch"
                          pt={6}
                          mt={4}
                          borderTopWidth="1px"
                        >
                          {/* Workout Summary Stats */}
                          <HStack gap={2} mb={1}>
                            <Badge
                              colorPalette="blue"
                              variant="subtle"
                              p={2}
                              borderRadius="md"
                              display="flex"
                              alignItems="center"
                              gap={1.5}
                            >
                              <Target size={14} />
                              <Text fontSize="xs">
                                {workout.exercises?.length || 0} Exercises
                              </Text>
                            </Badge>
                            <Badge
                              colorPalette="purple"
                              variant="subtle"
                              p={2}
                              borderRadius="md"
                              display="flex"
                              alignItems="center"
                              gap={1.5}
                            >
                              <Timer size={14} />
                              <Text fontSize="xs">
                                {workout.exercises?.reduce(
                                  (acc, ex) => acc + (ex.sets || 0),
                                  0,
                                ) || 0}{" "}
                                Total Sets
                              </Text>
                            </Badge>
                          </HStack>

                          {/* Exercise List */}
                          {workout.exercises?.map((exercise, idx) => (
                            <MotionBox
                              key={exercise.id}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              p={3}
                              bg="gray.50"
                              _dark={{ bg: "whiteAlpha.50" }}
                              borderRadius="5px"
                              borderWidth="1px"
                            >
                              <Flex justify="space-between" align="start">
                                <VStack align="start" gap={1} flex={1}>
                                  <HStack gap={2}>
                                    <Text fontSize="md">
                                      {exercise.exercise.name}
                                    </Text>
                                  </HStack>
                                  <HStack gap={3} flexWrap="wrap">
                                    <Badge
                                      size="sm"
                                      colorPalette="green"
                                      variant="outline"
                                      borderRadius="5px"
                                    >
                                      {exercise.exercise.category.name}
                                    </Badge>
                                  </HStack>
                                </VStack>
                                <HStack gap={2} ml={4}>
                                  <VStack gap={1} align="center">
                                    <Box
                                      color="var(--reppy-green)"
                                      px={1}
                                      py={1}
                                      borderRadius="5px"
                                      fontWeight="bold"
                                      fontSize="lg"
                                      maxW={"50px"}
                                      textAlign="center"
                                    >
                                      {exercise.sets}
                                    </Box>
                                    <Text
                                      fontSize="xs"
                                      color="gray.500"
                                      fontWeight="medium"
                                    >
                                      Sets
                                    </Text>
                                  </VStack>
                                  <VStack gap={1} align="center">
                                    <Box
                                      color="var(--reppy-green)"
                                      px={1}
                                      py={1}
                                      borderRadius="5px"
                                      fontWeight="bold"
                                      fontSize="lg"
                                      maxW={"50px"}
                                      textAlign="center"
                                    >
                                      {exercise.reps}
                                    </Box>
                                    <Text
                                      fontSize="xs"
                                      color="gray.500"
                                      fontWeight="medium"
                                    >
                                      Reps
                                    </Text>
                                  </VStack>
                                </HStack>
                              </Flex>
                            </MotionBox>
                          ))}
                        </VStack>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </CardBody>
              </MotionCard>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
};

export default UserWorkouts;
