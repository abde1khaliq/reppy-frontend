import useWorkouts from "@/app/hooks/useWorkouts";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  Badge,
  Flex,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Pencil, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MotionCard = motion.create(Card.Root);
const MotionBox = motion.create(Box);

const Workouts = () => {
  const { data: session } = useSession();
  const { workouts, loading } = useWorkouts(session);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

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
    <>
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
              borderWidth="1.5px"
              cursor="pointer"
              onClick={() => toggleWorkout(workout.id)}
              transition={{
                layout: { duration: 0.4, type: "spring", bounce: 0.2 },
              }}
              style={{ overflow: "hidden" }}
            >
              <CardBody p={0}>
                {/* Header Section */}
                <Box p={{ base: 3, md: 4 }} position="relative">
                  {/* Decorative Corner Element */}
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    w="100px"
                    h="100px"
                    bg="var(--reppy-green)"
                    opacity={0.04}
                    borderBottomLeftRadius="full"
                    pointerEvents="none"
                  />

                  <Flex
                    justify="space-between"
                    align="center"
                    position="relative"
                    gap={3}
                  >
                    <HStack gap={3} flex={1} align="center" minW={0}>
                      <Box
                        p={2}
                        borderRadius="12px"
                        position="relative"
                        flexShrink={0}
                      >
                        <Dumbbell
                          size={20}
                          color="var(--reppy-green)"
                          strokeWidth={1.5}
                        />
                      </Box>

                      <VStack align="start" gap={0.5} flex={1} minW={0}>
                        <Heading size="md" letterSpacing="-0.02em" truncate>
                          {workout.title}
                        </Heading>
                        <HStack gap={3} flexWrap="wrap">
                          <HStack gap={1.5} align="center">
                            <Box
                              w="4px"
                              h="4px"
                              borderRadius="full"
                              bg="var(--reppy-green)"
                              flexShrink={0}
                            />
                            <Text
                              fontSize="sm"
                              color="gray.600"
                              _dark={{ color: "gray.400" }}
                            >
                              {workout.exercises?.length || 0} exercises
                            </Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </HStack>

                    <HStack gap={1} flexShrink={0}>
                      <IconButton
                        aria-label="Start Workout"
                        variant="ghost"
                        size="md"
                        borderRadius="10px"
                        bg="transparent"
                        color="white"
                        _hover={{
                          bg: "blackAlpha.100",
                          _dark: { bg: "whiteAlpha.200" },
                        }}
                        onClick={(e) => handleStartWorkout(e, workout.id)}
                      >
                        <Play size={16} />
                      </IconButton>
                      <IconButton
                        aria-label="Edit workout"
                        variant="ghost"
                        size="md"
                        borderRadius="10px"
                        onClick={(e) => handleEditWorkout(e, workout.id)}
                        _hover={{
                          bg: "blackAlpha.100",
                          _dark: { bg: "whiteAlpha.200" },
                        }}
                      >
                        <Pencil size={18} />
                      </IconButton>
                    </HStack>
                  </Flex>
                </Box>

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
                      <VStack gap={0} align="stretch">
                        {/* Exercise List */}
                        {workout.exercises?.map((exercise, idx) => (
                          <MotionBox
                            key={exercise.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            p={{ base: 4, md: 5 }}
                            borderBottomWidth="1px"
                            borderColor="gray.100"
                            _dark={{ borderColor: "whiteAlpha.100" }}
                            _last={{ borderBottom: "none" }}
                            _hover={{
                              bg: "blackAlpha.25",
                              _dark: { bg: "whiteAlpha.50" },
                            }}
                            css={{ transition: "background 0.2s ease" }}
                          >
                            <Flex
                              justify="space-between"
                              align="center"
                              gap={4}
                            >
                              <HStack gap={3} flex={1} align="center" minW={0}>
                                {/* Sets Display - Left Side */}
                                <VStack
                                  gap={0}
                                  align="center"
                                  minW="50px"
                                  flexShrink={0}
                                >
                                  <Text
                                    fontSize="2xl"
                                    fontWeight="700"
                                    color="var(--reppy-green)"
                                    lineHeight="1"
                                    letterSpacing="-0.02em"
                                  >
                                    {exercise.sets}
                                  </Text>
                                  <Text
                                    fontSize="xs"
                                    color="gray.500"
                                    fontWeight="500"
                                    textTransform="uppercase"
                                    letterSpacing="0.05em"
                                    mt={1}
                                  >
                                    Sets
                                  </Text>
                                </VStack>

                                <VStack align="start" gap={2} flex={1} minW={0}>
                                  <Text
                                    fontSize="md"
                                    fontWeight="600"
                                    letterSpacing="-0.01em"
                                  >
                                    {exercise.exercise.name}
                                  </Text>
                                  <Badge
                                    size="sm"
                                    colorPalette="green"
                                    variant="subtle"
                                    borderRadius="6px"
                                    px={2.5}
                                    py={1}
                                    fontSize="xs"
                                    fontWeight="500"
                                  >
                                    {exercise.exercise.category.name}
                                  </Badge>
                                </VStack>
                              </HStack>

                              {/* Reps Display - Right Side */}
                              <VStack
                                gap={0}
                                align="center"
                                minW="60px"
                                flexShrink={0}
                              >
                                <Text
                                  fontSize="2xl"
                                  fontWeight="700"
                                  color="var(--reppy-green)"
                                  lineHeight="1"
                                  letterSpacing="-0.02em"
                                >
                                  {exercise.reps}
                                </Text>
                                <Text
                                  fontSize="xs"
                                  color="gray.500"
                                  fontWeight="500"
                                  textTransform="uppercase"
                                  letterSpacing="0.05em"
                                  mt={1}
                                >
                                  MAX Reps
                                </Text>
                              </VStack>
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
    </>
  );
};

export default Workouts;
