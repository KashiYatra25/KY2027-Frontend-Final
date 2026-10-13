import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { TeamsPageContent } from "@/components/pages/teams/TeamsPageContent";

export const metadata = {
  title: "My Teams | Kashi Yatra 2027",
  description: "Manage your teams for Kashi Yatra 2027 events",
};

export default async function TeamsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return <TeamsPageContent />;
}
