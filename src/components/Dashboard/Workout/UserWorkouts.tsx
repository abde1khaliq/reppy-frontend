"use client";

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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Pencil } from "lucide-react";
import { useState } from "react";

const MotionCard = motion.create(Card.Root);
const MotionBox = motion.create(Box);

interface Exercise {
  id: string;
  name: string;
  sets: number;
  weight?: number;
}

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  lastPerformed?: string;
}

const SAMPLE_WORKOUTS: Workout[] = [
  {
    id: "1",
    name: "Upper Body A",
    lastPerformed: "2 days ago",
    exercises: [
      { id: "e1", name: "Bench Press (Dumbbell)", sets: 1 },
      { id: "e2", name: "Incline Chest Press (Machine)", sets: 1 },
      { id: "e3", name: "Shoulder Press", sets: 2 },
      { id: "e4", name: "Bicep Curls", sets: 1 },
      { id: "e5", name: "Tricep Dips", sets: 2 },
    ],
  },
  {
    id: "2",
    name: "Lower Body",
    lastPerformed: "3 days ago",
    exercises: [
      { id: "e1", name: "Squats", sets: 5 },
      { id: "e2", name: "Leg Press", sets: 4 },
      { id: "e3", name: "Lunges", sets: 3 },
      { id: "e4", name: "Calf Raises", sets: 4 },
    ],
  },
  {
    id: "3",
    name: "Upper Body B",
    lastPerformed: "4 days ago",
    exercises: [
      { id: "e1", name: "Incline Chest Press (Machine)", sets: 1 },
      { id: "e2", name: "Bench Press (Dumbbell)", sets: 1 },
      { id: "e3", name: "Lat Pulldown (Single Arm)", sets: 2 },
      { id: "e4", name: "Reverse Fly (Cable)", sets: 1 },
      { id: "e5", name: "Tricep Dips", sets: 2 },
      { id: "e6", name: "Bicep Curls", sets: 2 },
    ],
  },
];

const UserWorkouts = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workouts] = useState<Workout[]>(SAMPLE_WORKOUTS);

  const handleCreateWorkout = () => {
    console.log("Create new workout");
  };

  const handleEditWorkout = (e: React.MouseEvent, workoutId: string) => {
    e.stopPropagation();
    console.log("Edit workout:", workoutId);
  };

  const toggleWorkout = (workoutId: string) => {
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
              {workouts.length} workout{workouts.length !== 1 ? "s" : ""}{" "}
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
        <VStack gap={4} align="stretch">
          {workouts.map((workout) => (
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
                        {workout.name}
                      </Heading>
                      <Text fontSize="xs" color="gray.500">
                        {workout.lastPerformed}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <Badge
                      colorScheme="green"
                      variant="subtle"
                      borderRadius="full"
                    >
                      {workout.exercises.length} Exercises
                    </Badge>
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
                          height: { type: "spring", bounce: 0, duration: 0.3 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <VStack
                        gap={2}
                        align="stretch"
                        pt={6}
                        mt={4}
                        borderTopWidth="1px"
                      >
                        {workout.exercises.map((exercise, idx) => (
                          <MotionBox
                            key={exercise.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            p={1.5}
                            bg="gray.50"
                            _dark={{ bg: "whiteAlpha.50" }}
                            borderRadius="md"
                          >
                            <Flex justify="space-between" align="center">
                              <Text fontSize="sm" fontWeight="medium">
                                {exercise.name}
                              </Text>
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

        {workouts.length === 0 && (
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
        )}
      </Container>
    </Box>
  );
};

export default UserWorkouts;
