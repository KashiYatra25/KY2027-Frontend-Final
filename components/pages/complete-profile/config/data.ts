import { GraduationCap, Phone, Shield, type LucideIcon } from "lucide-react";

interface StepConfig {
  id: number;
  key: "college" | "identity" | "phone";
  title: string;
  description: string;
  icon: LucideIcon;
}

// 3 main steps for profile completion
// Order: College → Identity (Aadhaar OR Manual) → Phone
export const STEPS: StepConfig[] = [
  {
    id: 1,
    key: "college",
    title: "College Details",
    description: "Academic information",
    icon: GraduationCap,
  },
  {
    id: 2,
    key: "identity",
    title: "Identity Verification",
    description: "Verify your identity",
    icon: Shield,
  },
  {
    id: 3,
    key: "phone",
    title: "Phone Verification",
    description: "Contact verification",
    icon: Phone,
  },
];

export type { StepConfig };
