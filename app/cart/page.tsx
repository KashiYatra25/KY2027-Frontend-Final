import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { CartPageContent } from "@/components/pages/cart/CartPageContent";

export const metadata: Metadata = {
  title: "Buy Passes | Kashi Yatra 2027",
  description:
    "Purchase your festival passes for Kashi Yatra 2027 through our official ticketing partner KonfHub.",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/cart");
  }

  return <CartPageContent />;
}
