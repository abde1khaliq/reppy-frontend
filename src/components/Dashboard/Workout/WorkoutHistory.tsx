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
  Container,
  Accordion,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Dumbbell,
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MotionCard = motion.create(Card.Root);
const MotionBox = motion.create(Box);

interface ExerciseHistory {
  id: string;
  name: string;
  sets: Array<{
    setNumber: number;
    reps: number;
    weight?: number;
  }>;
}

interface WorkoutSession {
  id: string;
  workoutName: string;
  date: string;
  duration: number;
  calories: number;
  exercises: ExerciseHistory[];
}

const SAMPLE_HISTORY: WorkoutSession[] = [
  {
    id: "h1",
    workoutName: "Upper Body Strength",
    date: "January 22, 2026",
    duration: 45,
    calories: 380,
    exercises: [
      {
        id: "e1",
        name: "Bench Press",
        sets: [
          { setNumber: 1, reps: 10, weight: 80 },
          { setNumber: 2, reps: 10, weight: 80 },
          { setNumber: 3, reps: 8, weight: 85 },
          { setNumber: 4, reps: 8, weight: 85 },
        ],
      },
      {
        id: "e2",
        name: "Shoulder Press",
        sets: [
          { setNumber: 1, reps: 12, weight: 30 },
          { setNumber: 2, reps: 10, weight: 30 },
          { setNumber: 3, reps: 10, weight: 32.5 },
        ],
      },
      {
        id: "e3",
        name: "Bicep Curls",
        sets: [
          { setNumber: 1, reps: 15, weight: 15 },
          { setNumber: 2, reps: 12, weight: 17.5 },
          { setNumber: 3, reps: 10, weight: 17.5 },
        ],
      },
    ],
  },
];

const WorkoutHistory = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatChartData = (sets: ExerciseHistory["sets"]) => {
    return sets.map((set) => ({
      set: `Set ${set.setNumber}`,
      reps: set.reps,
      weight: set.weight || 0,
    }));
  };

  return (
    <Box>
      <Container>
        <VStack align="start" gap={1} mb={8}>
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            color={{ base: "black", _dark: "white" }}
          >
            My Workout History
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Track your progress over time
          </Text>
        </VStack>

        <Accordion.Root collapsible>
          <VStack gap={4} align="stretch">
            {SAMPLE_HISTORY.map((session) => (
              <MotionCard
                layout
                key={session.id}
                bg="transparent"
                variant="outline"
                borderRadius={"5px"}
                overflow="hidden"
                transition={{
                  layout: { duration: 0.4, type: "spring", bounce: 0.2 },
                }}
              >
                <Box
                  p={{ base: 4, md: 6 }}
                  cursor="pointer"
                  onClick={() => toggleExpand(session.id)}
                >
                  <Flex justify="space-between" align="center">
                    <HStack gap={4}>
                      <Box borderRadius="lg">
                        <Dumbbell size={22} color="var(--reppy-green)" />
                      </Box>
                      <VStack align="start" gap={0}>
                        <Heading size="sm">{session.workoutName}</Heading>
                        <Text fontSize="xs" color="gray.500">
                          {session.date}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack gap={4}>
                      <HStack
                        gap={1}
                        fontSize="xs"
                        color="gray.500"
                        display={{ base: "none", sm: "flex" }}
                      >
                        <Clock size={14} />
                        <Text>{session.duration} mins</Text>
                      </HStack>
                      <MotionBox
                        animate={{
                          rotate: expandedId === session.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={20} color="gray" />
                      </MotionBox>
                    </HStack>
                  </Flex>
                </Box>

                <AnimatePresence initial={false}>
                  {expandedId === session.id && (
                    <MotionBox
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { type: "spring", bounce: 0, duration: 0.4 },
                          opacity: { duration: 0.2, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3 },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <Box px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
                        <VStack
                          gap={6}
                          align="stretch"
                          pt={4}
                          borderTopWidth="1px"
                        >
                          {session.exercises.map((exercise, exIdx) => (
                            <MotionBox
                              key={exercise.id}
                              p={4}
                              borderRadius="lg"
                              bg="gray.50"
                              _dark={{ bg: "whiteAlpha.50" }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: exIdx * 0.05 }}
                            >
                              <VStack align="stretch" gap={4}>
                                <HStack justify="space-between">
                                  <HStack gap={2}>
                                    <TrendingUp
                                      size={18}
                                      color="var(--reppy-green)"
                                    />
                                    <Text fontWeight="bold" fontSize="md">
                                      {exercise.name}
                                    </Text>
                                  </HStack>
                                  <Badge variant="subtle">
                                    {exercise.sets.length} sets
                                  </Badge>
                                </HStack>

                                {/* Chart Container */}
                                <Box h="180px" w="100%">
                                  <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                  >
                                    <BarChart
                                      data={formatChartData(exercise.sets)}
                                    >
                                      <CartesianGrid
                                        strokeDasharray="3 3"
                                        opacity={0.1}
                                        vertical={false}
                                      />
                                      <XAxis
                                        dataKey="set"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                      />
                                      <YAxis
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                      />
                                      <Tooltip
                                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                        contentStyle={{
                                          borderRadius: "8px",
                                          border: "none",
                                          boxShadow:
                                            "0 4px 12px rgba(0,0,0,0.1)",
                                        }}
                                      />
                                      <Bar
                                        dataKey="reps"
                                        fill="var(--reppy-green)"
                                        radius={[4, 4, 0, 0]}
                                        barSize={30}
                                      />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </Box>
                              </VStack>
                            </MotionBox>
                          ))}
                        </VStack>
                      </Box>
                    </MotionBox>
                  )}
                </AnimatePresence>
              </MotionCard>
            ))}
          </VStack>
        </Accordion.Root>

        {SAMPLE_HISTORY.length === 0 && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            py={12}
          >
            <Calendar size={48} color="gray" style={{ margin: "0 auto" }} />
            <Heading
              fontSize="xl"
              fontFamily="var(--font-poppins)"
              color="gray.500"
              mt={4}
            >
              No workout history yet
            </Heading>
            <Text fontSize="sm" color="gray.400" mt={2}>
              Complete your first workout to see your progress
            </Text>
          </MotionBox>
        )}
      </Container>
    </Box>
  );
};

export default WorkoutHistory;
