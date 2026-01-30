import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SideBar from "@/components/Dashboard/NavigationBar";
import DashboardHeader from "@/components/Dashboard/Home/DashboardHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Flex minH="100vh">
        <SideBar />
        <Box flex="1" pb={{ base: "100px", md: "0" }}>
          <DashboardHeader />
          {children}
        </Box>
      </Flex>
    </>
  );
}
