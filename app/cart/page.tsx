import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/api/auth";
import { CartPageContent } from "@/components/pages/cart";

export const metadata: Metadata = {
  title: "Cart | Kashi Yatra 2027",
  description: "Review your selected passes and proceed to checkout for Kashi Yatra 2027.",
};

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/cart");
  }

  return <CartPageContent />;
}
