import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Upgrade} from '../interfaces/upgrade.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Coins
  private coins = new BehaviorSubject<number>(0);
  public coins$ = this.coins.asObservable();
  private coinsPerSecond = 0;

  // Multipliers
  private coinMultiplier = new BehaviorSubject<number>(1);
  public coinMultiplier$ = this.coinMultiplier.asObservable();

  // Upgrades
  upgradesList: Upgrade[] = [
    {id: 0, name: 'Rouge', icon: '/characters/hobbitAI1.jpg', cost: 20, level:0, multiplier: 1},
    {id: 1, name: 'Knight', icon: '/characters/knightAI1.jpg', cost: 50, level:0, multiplier: 3},
    {id: 2, name: 'Huntress', icon: '/characters/huntressAI1.jpg', cost: 120, level:0, multiplier: 7},
    {id: 3, name: 'Mage', icon: '/characters/mageAI1.jpg', cost: 1000, level:0, multiplier: 12}
  ]
  upgrade = new BehaviorSubject<Upgrade[]>(this.upgradesList);
  upgrade$ = this.upgrade.asObservable();

  constructor() { }

  addCoins(amount: number) {
    this.coins.next(this.coins.value + (amount * this.coinMultiplier.value));
  }

  increaseCoinMultiplier(amount: number) {
    this.coinMultiplier.next((this.coinMultiplier.value + amount));
  }

  levelUpUpgrade(upgrade: Upgrade): void {
    //let itemIndex = this.upgrade.value.findIndex(x => x.id === upgrade.id);
    upgrade.level += 1;
    upgrade.cost *= 1.3;

    this.upgrade.value[upgrade.id] = upgrade;

    this.coinsPerSecond += upgrade.multiplier;
  }
}
