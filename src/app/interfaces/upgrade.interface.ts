export interface Upgrade {
  id: number;
  name: string;
  icon: string;
  cost: number;
  level: number;
  incomeMultiplier: number;
  damageMultiplier: number;
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

export interface SkillItem {
  id: number;
  name: string;
  icon: string;
  cooldown: number;
  isOnCooldown: boolean;
  damage: number;
  isUnlocked: boolean;
  effect: (x: any) => void;
}
