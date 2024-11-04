export interface Upgrade {
  id: number;
  name: string;
  icon: string;
  cost: number;
  level: number;
  multiplier: number;
  isAvailable: boolean;
}

export interface Items {
  id: number;
  name: string;
  icon: string;
  cost: number;
  effect: () => void;
  isPurchased: boolean;
  isUnlocked: () => boolean;
}
