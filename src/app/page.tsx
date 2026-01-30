import { getServerSession } from "next-auth";
import LHome from "../components/LandingPage/LHome";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <LHome />;
}
