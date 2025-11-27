// Reward points calculation and management

export const REWARD_POINTS = {
  dry: 10,
  wet: 15,
  recyclable: 25,
  ewaste: 50,
  firstPickupBonus: 100,
  subscriptionCycle: 50,
} as const;

export type WasteType = keyof typeof REWARD_POINTS;

export const calculatePoints = (wasteType: string): number => {
  const type = wasteType.toLowerCase();
  if (type === "e-waste" || type === "ewaste") return REWARD_POINTS.ewaste;
  if (type in REWARD_POINTS) return REWARD_POINTS[type as WasteType];
  return 10; // Default
};

export const getWasteTypeLabel = (wasteType: string): string => {
  const labels: Record<string, string> = {
    dry: "Dry Waste",
    wet: "Wet Waste",
    recyclable: "Recyclable",
    ewaste: "E-Waste",
    "e-waste": "E-Waste",
  };
  return labels[wasteType.toLowerCase()] || wasteType;
};

// Get user rewards from localStorage
export const getUserRewards = () => {
  const data = localStorage.getItem("userRewards");
  if (!data) {
    return { totalPoints: 0, redeemedPoints: 0, history: [] };
  }
  return JSON.parse(data);
};

// Update user rewards
export const updateUserRewards = (points: number, action: string, requestId?: number) => {
  const rewards = getUserRewards();
  rewards.totalPoints += points;
  rewards.history.unshift({
    id: Date.now(),
    points,
    action,
    requestId,
    date: new Date().toISOString(),
  });
  localStorage.setItem("userRewards", JSON.stringify(rewards));
};

// Award points for completed pickup
export const awardPickupPoints = (wasteType: string, requestId: number, isFirstPickup: boolean = false) => {
  const points = calculatePoints(wasteType);
  const bonusPoints = isFirstPickup ? REWARD_POINTS.firstPickupBonus : 0;
  const totalPoints = points + bonusPoints;
  
  const action = isFirstPickup 
    ? `First Pickup Bonus + ${getWasteTypeLabel(wasteType)} Pickup`
    : `${getWasteTypeLabel(wasteType)} Pickup`;
  
  updateUserRewards(totalPoints, action, requestId);
  return totalPoints;
};
