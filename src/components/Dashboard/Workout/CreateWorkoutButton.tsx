import useExercises from "@/app/hooks/useExercises";
import {
  Box,
  Button,
  Dialog,
  Drawer,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  Separator,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const CreateWorkoutButton = () => {
  const { data: session } = useSession();
  const { exercises, loading, error } = useExercises(session);

  return (
    <Dialog.Root size="md" motionPreset="slide-in-bottom">
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

                <Drawer.Root>
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
                          {exercises.map((exercise) => (
                            <Button
                              key={exercise.name}
                              variant="ghost"
                              justifyContent="start"
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="gray.900"
                              py={5}
                            >
                              <HStack w="100%" justify="space-between">
                                <Text
                                  fontSize="sm"
                                  fontWeight="600"
                                  color="white"
                                >
                                  {exercise.name}
                                </Text>
                                <Text
                                  bg="gray.800"
                                  px={2}
                                  py={0.5}
                                  borderRadius="md"
                                  fontSize="10px"
                                  fontWeight="700"
                                  color="gray.400"
                                  textTransform="uppercase"
                                >
                                  {exercise.category.name}
                                </Text>
                              </HStack>
                            </Button>
                          ))}
                        </VStack>
                      </Drawer.Body>

                      <Drawer.Footer px={5} pb={5}>
                        <Button variant="outline" w="full" onClick={() => {}}>
                          Cancel
                        </Button>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger color="white" />
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Drawer.Root>
              </HStack>

              <VStack align="stretch" gap={2}>
                <HStack
                  justify="space-between"
                  p={3}
                  border="1px solid"
                  borderColor="gray.900"
                  borderRadius="xl"
                >
                  <Text fontSize="sm" fontWeight="600" color="white">
                    Bench Press
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
                      defaultValue={1}
                      borderRadius="md"
                      bg="gray.900"
                      border="none"
                      color="white"
                      fontWeight="700"
                    />
                  </HStack>
                </HStack>
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
            >
              Save Workout
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default CreateWorkoutButton;
