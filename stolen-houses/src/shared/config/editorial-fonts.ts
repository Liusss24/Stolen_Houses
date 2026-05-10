import {
  Cinzel,
  Cormorant_Garamond,
  Limelight,
} from "next/font/google";

export const limelightDisplay = Limelight({
  variable: "--font-limelight",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const cinzelFallback = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
