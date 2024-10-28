import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Coins
  private coins = new BehaviorSubject<number>(0);
  public coins$ = this.coins.asObservable();

  // Multipliers
  private coinMultiplier = new BehaviorSubject<number>(1);
  public coinMultiplier$ = this.coinMultiplier.asObservable();

  constructor() { }

  addCoins(amount: number) {
    this.coins.next(this.coins.value + (amount * this.coinMultiplier.value));
  }

  increaseCoinMultiplier(amount: number) {
    this.coinMultiplier.next((this.coinMultiplier.value + amount));
  }
}
