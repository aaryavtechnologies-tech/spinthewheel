import type { LucideIcon } from "lucide-react";
import { BadgeIndianRupee, Crown, Gift, Percent, ShoppingBag, Star } from "lucide-react";

export type Prize = { id: string; label: string; shortLabel: string; value: string; type: "discount" | "cashback" | "gift" | "jackpot"; color: string; icon: LucideIcon; probability: number };

export const prizes: Prize[] = [
  { id: "ten", label: "10% OFF", shortLabel: "10%\nOFF", value: "10", type: "discount", color: "#2563eb", icon: Percent, probability: 25 },
  { id: "five-hundred", label: "Flat ₹500 OFF", shortLabel: "₹500\nOFF", value: "500", type: "discount", color: "#f97316", icon: BadgeIndianRupee, probability: 10 },
  { id: "free-gift", label: "Free Gift", shortLabel: "FREE\nGIFT", value: "gift", type: "gift", color: "#08a96b", icon: Gift, probability: 10 },
  { id: "bogo", label: "Buy 1 Get 1", shortLabel: "BUY 1\nGET 1", value: "bogo", type: "gift", color: "#ec407a", icon: ShoppingBag, probability: 10 },
  { id: "cashback", label: "₹100 Cashback", shortLabel: "₹100\nCASHBACK", value: "100", type: "cashback", color: "#089ec4", icon: BadgeIndianRupee, probability: 15 },
  { id: "surprise", label: "Surprise Offer", shortLabel: "SURPRISE\nOFFER", value: "surprise", type: "gift", color: "#f6c344", icon: Star, probability: 7 },
  { id: "twenty", label: "20% OFF", shortLabel: "20%\nOFF", value: "20", type: "discount", color: "#a72bd4", icon: Percent, probability: 20 },
  { id: "jackpot", label: "JACKPOT OFFER", shortLabel: "JACKPOT\nOFFER", value: "jackpot", type: "jackpot", color: "#e51e36", icon: Crown, probability: 3 },
];
