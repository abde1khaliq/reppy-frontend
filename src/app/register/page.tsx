import AccountCreationPanel from "@/components/Auth/Registeration/AccountCreationPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AccountCreationPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <AccountCreationPanel />;
}
