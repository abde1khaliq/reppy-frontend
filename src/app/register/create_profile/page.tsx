import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileCreationPanel from "@/components/Auth/Registeration/ProfileCreationPanel";

export default async function ProfileCreationPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return <ProfileCreationPanel />;
}
