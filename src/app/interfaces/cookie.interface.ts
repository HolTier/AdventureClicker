export interface GameSave {
  name: string,
  date: string,
  coins: number,
  allCoins: number,
  coinsPerSecond: number,
  enemyCurrentHealth: number,
  enemyMaxHealth: number,
  damagePerSeconds: number,
  clickMultiplier: number,
  upgradesList: UpgradeSave[],
  itemsList: ItemSave[],
  skillsList: ItemSave[]
}

export interface UpgradeSave {
  id: number,
  level: number
}

export interface ItemSave {
  id: number,
  isUnlocked: boolean,
}
