import { Metadata } from "next";
import { CartPageContent } from "@/components/pages/cart";

export const metadata: Metadata = {
  title: "Cart | Kashi Yatra 2027",
  description: "Review your selected passes and proceed to checkout for Kashi Yatra 2027.",
};

export default function CartPage() {
  return <CartPageContent />;
}
