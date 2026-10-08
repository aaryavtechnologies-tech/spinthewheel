import type { Prize } from "@/data/prizes";
const codes: Record<string, string> = { ten: "NAV10", twenty: "NAV20", cashback: "CASH100", "five-hundred": "SAVE500", "free-gift": "FREEGIFT", bogo: "BOGO", surprise: "NAVSURPRISE", jackpot: "JACKPOT" };
export const getCouponCode = (prize: Prize) => codes[prize.id] ?? "NAVRATRI";
