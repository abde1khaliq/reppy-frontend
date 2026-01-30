"use client";

import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { SegmentGroup } from "@chakra-ui/react";
import { useState } from "react";
import UserWorkouts from "@/components/Dashboard/Workout/UserWorkouts";
import WorkoutHistory from "@/components/Dashboard/Workout/WorkoutHistory";

const WorkoutLayout = () => {
  const [activeTab, setActiveTab] = useState<string>("Your Workouts");

  return (
    <Box>
      <Container py={2} px={{ base: 4, md: 6 }}>
        {/* Header */}
        <Box mb={6}>
          <VStack align="start" gap={1}>
            <Heading
              fontSize={{ base: "2xl", md: "4xl" }}
              color={{ base: "black", _dark: "white" }}
            >
              Workouts
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Manage your workouts and track your progress
            </Text>
          </VStack>
        </Box>

        {/* Segment Control */}
        <Box mb={6} p={1} w={{ base: "100%", sm: "auto" }}>
          <SegmentGroup.Root
            defaultValue="Your Workouts"
            onValueChange={(e: any) => setActiveTab(e.value)}
            size="lg"
            w="100%"
          >
            <SegmentGroup.Indicator bg="var(--reppy-green)" borderRadius="sm" />
            <SegmentGroup.Item
              value="Your Workouts"
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 4, md: 6 }}
              py={3}
              _selected={{
                color: "black",
              }}
              transition="all 0.2s"
              flex={1}
              cursor="pointer"
            >
              <SegmentGroup.ItemText>Your Workouts</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item
              value="History"
              fontSize={{ base: "sm", md: "md" }}
              px={{ base: 4, md: 6 }}
              py={3}
              _selected={{
                color: "black",
              }}
              transition="all 0.2s"
              flex={1}
              cursor="pointer"
            >
              <SegmentGroup.ItemText>History</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
        </Box>

        {/* Content */}
        <Box>
          {activeTab === "Your Workouts" ? (
            <UserWorkouts />
          ) : (
            <WorkoutHistory />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default WorkoutLayout;
