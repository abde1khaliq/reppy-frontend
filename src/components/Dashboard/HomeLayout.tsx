"use client";

import { Grid } from "@chakra-ui/react";
import StreakCard from "@/components/Dashboard/Home/StreakCard";
import AIStrategyCard from "@/components/Dashboard/Home/AIStrategyCard";
import ProfileCreationBanner from "@/components/Dashboard/Home/ProfileCreationBanner";
import useCheckProfile from "@/app/hooks/useCheckProfile";

const HomePanel = () => {
  const hasProfile = useCheckProfile();

  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        px={4}
      >
        {hasProfile === null && null}
        {hasProfile === false && <ProfileCreationBanner />}
        <StreakCard />
        <AIStrategyCard />
      </Grid>
    </>
  );
};

export default HomePanel;
