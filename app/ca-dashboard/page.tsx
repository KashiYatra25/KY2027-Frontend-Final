import { Metadata } from "next";
import { CADashboardContent } from "@/components/pages/ca-dashboard/CADashboardContent";

export const metadata: Metadata = {
  title: "CA Dashboard - Leaderboard",
  description:
    "Campus Ambassador Leaderboard for Kashi Yatra 2027. See the top ambassadors ranked by referrals.",
  keywords: [
    "Kashi Yatra campus ambassador",
    "CA leaderboard",
    "IIT BHU cultural fest",
    "referral leaderboard",
  ],
  openGraph: {
    title: "CA Leaderboard - Kashi Yatra 2027",
    description: "Check out the top Campus Ambassadors and their referral rankings!",
  },
};

export default function CADashboardPage() {
  return <CADashboardContent />;
}
