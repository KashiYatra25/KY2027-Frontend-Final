import { GraduationCap, Phone, Shield, Upload, type LucideIcon } from "lucide-react";

interface StepConfig {
  id: number;
  key: "college" | "aadhaarUpload" | "aadhaarVerify" | "phone";
  title: string;
  description: string;
  icon: LucideIcon;
}

// 4 main steps for profile completion
// Order: College → Aadhaar Upload → Aadhaar Verify → Phone
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
    key: "aadhaarUpload",
    title: "Upload Aadhaar",
    description: "Upload your ID",
    icon: Upload,
  },
  {
    id: 3,
    key: "aadhaarVerify",
    title: "Verify Aadhaar",
    description: "Identity verification",
    icon: Shield,
  },
  {
    id: 4,
    key: "phone",
    title: "Phone Verification",
    description: "Contact verification",
    icon: Phone,
  },
];

export type { StepConfig };
