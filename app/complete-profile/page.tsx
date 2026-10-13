import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { redirect } from "next/navigation";
import { CompleteProfileContent } from "@/components/pages/complete-profile/CompleteProfileContent";

export default async function CompleteProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return <CompleteProfileContent />;
}
