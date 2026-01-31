import useExercises from "@/app/hooks/useExercises";
import {
  Button,
  Dialog,
  Drawer,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface SelectedExercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
}

const CreateWorkoutButton = () => {
  const { data: session } = useSession();
  const { exercises, loading, error } = useExercises(session);
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function storeWorkout() {
    if (!session?.accessToken) return;

    setIsSubmitting(true);

    try {
      const workout_payload = { title: workoutName };
      const workout_creation_response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/workouts/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${session.accessToken}`,
          },
          body: JSON.stringify(workout_payload),
        },
      );

      if (!workout_creation_response.ok) {
        throw new Error("Failed to create workout");
      }

      const data = await workout_creation_response.json();
      const workoutId = data.id;

      const exercise_payload = selectedExercises.map((ex) => ({
        sets: ex.sets,
        reps: ex.reps,
        exercise: ex.id,
      }));

      const exercise_add_response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/workouts/${workoutId}/exercises/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${session.accessToken}`,
          },
          body: JSON.stringify(exercise_payload),
        },
      );

      if (!exercise_add_response.ok) {
        const errText = await exercise_add_response.text();
        throw new Error(`Failed to add exercises: ${errText}`);
      }

      console.log("Workout created successfully with exercises!");
      setIsSubmitting(false);
      setDrawerOpen(false);
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog.Root
      size="md"
      motionPreset="slide-in-bottom"
      open={dialogOpen}
      onOpenChange={(e) => setDialogOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button bg="var(--reppy-green)" color="black" fontWeight="600">
          Create Workout
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner p={4}>
        <Dialog.Content
          w="100%"
          maxW={{ base: "100%", sm: "md" }}
          borderRadius="5px"
          alignSelf="center"
          display="flex"
          flexDirection="column"
          boxShadow="0 10px 40px rgba(0,0,0,0.5)"
          border="1px solid"
          borderColor="gray.900"
          bg="black"
        >
          <Dialog.CloseTrigger
            position="absolute"
            top={3}
            right={3}
            borderRadius="lg"
            color="gray.400"
          />

          <Dialog.Header px={5} pt={6} pb={0}>
            <VStack w="100%" align="start" gap={4}>
              <Dialog.Title fontSize="lg" color="white" m={0}>
                Create Workout
              </Dialog.Title>
              <Input
                required
                variant="outline"
                placeholder="Workout name"
                color="white"
                borderColor="gray.800"
                _placeholder={{ color: "gray.500" }}
                _focus={{ borderColor: "var(--reppy-green)" }}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </VStack>
          </Dialog.Header>

          <Dialog.Body px={5} py={6}>
            <VStack align="stretch" gap={5}>
              <HStack justify="space-between" align="center">
                <Heading
                  size="sm"
                  color="gray.500"
                  fontWeight="600"
                  letterSpacing="0.06em"
                  textTransform="uppercase"
                  fontSize="11px"
                >
                  Exercises
                </Heading>

                <Drawer.Root
                  open={drawerOpen}
                  onOpenChange={(e) => setDrawerOpen(e.open)}
                >
                  <Drawer.Trigger asChild>
                    <Button
                      bg="gray.900"
                      variant="ghost"
                      color="var(--reppy-green)"
                      size="sm"
                      fontWeight="600"
                      fontSize="13px"
                      borderRadius="lg"
                      px={3}
                      h="8"
                    >
                      Add Exercise
                    </Button>
                  </Drawer.Trigger>
                  <Drawer.Backdrop />
                  <Drawer.Positioner p={4}>
                    <Drawer.Content
                      w="100%"
                      maxW={{ base: "100%", sm: "sm" }}
                      maxH="80dvh"
                      display="flex"
                      flexDirection="column"
                      borderRadius="5px"
                      alignSelf="center"
                      bg="black"
                      border="1px solid"
                      borderColor="gray.800"
                    >
                      <Drawer.Header px={5} pt={5}>
                        <Drawer.Title
                          fontSize="lg"
                          fontWeight="700"
                          color="white"
                        >
                          Select Exercise
                        </Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body
                        px={5}
                        pb={5}
                        overflowY="auto"
                        css={{
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "transparent",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "var(--reppy-green)",
                            borderRadius: "10px",
                          },
                          scrollbarWidth: "thin",
                          scrollbarColor: "var(--reppy-green) transparent",
                        }}
                      >
                        <VStack align="stretch" gap={2}>
                          <Input
                            placeholder="Search Exercises..."
                            color="white"
                            borderColor="gray.800"
                            _focus={{ borderColor: "var(--reppy-green)" }}
                          />
                          <Separator mb={2} mt={2} borderColor="gray.900" />
                          {loading ? (
                            <Spinner />
                          ) : (
                            exercises.map((exercise) => (
                              <Button
                                key={exercise.id}
                                variant="ghost"
                                justifyContent="start"
                                borderRadius="lg"
                                border="1px solid"
                                borderColor={
                                  selectedExercises.find(
                                    (ex) => ex.id === exercise.id,
                                  )
                                    ? "var(--reppy-green)" // distinct border when selected
                                    : "gray.900"
                                }
                                py={5}
                                onClick={() => {
                                  setSelectedExercises(
                                    (prev) =>
                                      prev.find((ex) => ex.id === exercise.id)
                                        ? prev.filter(
                                            (ex) => ex.id !== exercise.id,
                                          ) // remove if already selected
                                        : [
                                            ...prev,
                                            { ...exercise, sets: 1, reps: 10 },
                                          ], // add if not selected
                                  );
                                }}
                              >
                                <HStack w="100%" justify="space-between">
                                  <Text
                                    fontSize="sm"
                                    fontWeight="600"
                                    color="white"
                                  >
                                    {exercise.name}
                                  </Text>
                                </HStack>
                              </Button>
                            ))
                          )}
                        </VStack>
                      </Drawer.Body>

                      {/* <Drawer.Footer px={5} pb={5}>
                        <Button
                          variant={
                            selectedExercises.length > 0 ? "solid" : "outline"
                          }
                          w="full"
                          bg={
                            selectedExercises.length > 0
                              ? "var(--reppy-green)"
                              : undefined
                          }
                          color={
                            selectedExercises.length > 0 ? "black" : "white"
                          }
                          onClick={() => {
                            if (selectedExercises.length > 0) {
                              // Close drawer automatically when exercises are added
                              // Drawer.CloseTrigger will handle closing
                            } else {
                              // Just cancel
                            }
                          }}
                        >
                          {selectedExercises.length > 0
                            ? "Add Exercises"
                            : "Cancel"}
                        </Button>
                      </Drawer.Footer> */}

                      <Drawer.CloseTrigger color="white" />
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Drawer.Root>
              </HStack>

              <VStack align="stretch" gap={2}>
                {selectedExercises.map((exercise) => (
                  <HStack
                    key={exercise.id}
                    justify="space-between"
                    p={3}
                    border="1px solid"
                    borderColor="gray.900"
                    borderRadius="xl"
                  >
                    <Text fontSize="sm" fontWeight="600" color="white">
                      {exercise.name}
                    </Text>
                    <HStack gap={3}>
                      <Text
                        fontSize="10px"
                        fontWeight="700"
                        color="gray.500"
                        textTransform="uppercase"
                      >
                        Sets
                      </Text>
                      <Input
                        type="number"
                        w="50px"
                        h="8"
                        textAlign="center"
                        value={exercise.sets}
                        borderRadius="md"
                        bg="gray.900"
                        border="none"
                        color="white"
                        fontWeight="700"
                        onChange={(e) => {
                          const newSets = parseInt(e.target.value, 0);
                          setSelectedExercises((prev) =>
                            prev.map((ex) =>
                              ex.id === exercise.id
                                ? { ...ex, sets: newSets }
                                : ex,
                            ),
                          );
                        }}
                      />
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Dialog.Body>

          <Dialog.Footer pt={0} pb={6}>
            <Button
              bg="var(--reppy-green)"
              color="black"
              w="100%"
              h="12"
              fontWeight="700"
              _hover={{ opacity: 0.9 }}
              onClick={storeWorkout}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner size="sm" mr={2} /> : null}
              {isSubmitting ? "" : "Save Workout"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CreateWorkoutButton;
