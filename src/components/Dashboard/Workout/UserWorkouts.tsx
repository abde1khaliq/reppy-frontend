"use client";

import { Box, Heading, VStack, Flex, Container } from "@chakra-ui/react";
import CreateWorkoutButton from "./CreateWorkoutButton";
import Workouts from "@/components/Dashboard/Workout/WorkoutsCard";

const UserWorkouts = () => {
  return (
    <Box>
      <Container>
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
          </VStack>

          <CreateWorkoutButton />
        </Flex>
        <Workouts />
      </Container>
    </Box>
  );
};

export default UserWorkouts;
