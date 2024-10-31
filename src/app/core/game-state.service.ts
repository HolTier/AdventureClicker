import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Items, Upgrade} from '../interfaces/upgrade.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Coins
  private coins = new BehaviorSubject<number>(0);
  public coins$ = this.coins.asObservable();
  private coinsPerSecond = 0;

  // Multipliers
  private clickMultiplier = new BehaviorSubject<number>(1);
  public clickMultiplier$ = this.clickMultiplier.asObservable();

  // Upgrades
  upgradesList: Upgrade[] = [
    {id: 0, name: 'Rouge', icon: '/characters/hobbitAI1.jpg', cost: 20, level:0, multiplier: 1, isAvailable: true},
    {id: 1, name: 'Knight', icon: '/characters/knightAI1.jpg', cost: 50, level:0, multiplier: 3, isAvailable: true},
    {id: 2, name: 'Huntress', icon: '/characters/huntressAI1.jpg', cost: 120, level:0, multiplier: 7, isAvailable: true},
    {id: 3, name: 'Mage', icon: '/characters/mageAI1.jpg', cost: 1000, level:0, multiplier: 12, isAvailable: true}
  ]
  upgrade = new BehaviorSubject<Upgrade[]>(this.upgradesList);
  upgrade$ = this.upgrade.asObservable();

  // Items
  itemsList: Items[] = [
    {
      id: 0, name: "Iron Sword", icon: "/items/ironSwordAI1.jpg", cost: 200, isPurchased: false,
        effect: () => this.increaseClickValue(2)
    },
    {
      id: 1, name: "Gold Sword", icon: "/items/goldSwordAI1.jpg", cost: 1200, isPurchased: false,
      effect: () => this.increaseClickValue(2)
    },
    {
      id: 2, name: "Platinum Sword", icon: "/items/platinumSwordAI1.jpg", cost: 10000, isPurchased: false,
      effect: () => this.increaseClickValue(2)
    },
    {
      id: 3, name: "Magic Ore Sword", icon: "/items/magicOreSwordAI1.jpg", cost: 45000, isPurchased: false,
      effect: () => this.increaseClickValue(2)
    }
  ]
  items = new BehaviorSubject<Items[]>(this.itemsList);
  items$ = this.items.asObservable();

  constructor() {

  }

  addCoins(amount: number) {
    this.coins.next(this.coins.value + (amount * this.clickMultiplier.value));
  }


  checkIfUpgradeIsAvailable() {
    for (let upgrade of this.upgrade.value) {
     upgrade.isAvailable = upgrade.cost <= this.coins.value;
    }
  }

  levelUpUpgrade(upgrade: Upgrade): void {
    // check if upgrade is available
    if (!upgrade.isAvailable) {
      return;
    }

    // Decrease coins
    this.coins.next(this.coins.value - upgrade.cost);

    // Update upgrade
    upgrade.level += 1;
    upgrade.cost *= 1.3;
    this.upgrade.value[upgrade.id] = upgrade;

    this.coinsPerSecond += upgrade.multiplier;
  }

  increaseClickValue(amount: number) {
    this.clickMultiplier.next((this.clickMultiplier.value * amount));
    console.log("CLICKER")
  }
}
