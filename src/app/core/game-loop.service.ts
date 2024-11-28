import {Injectable, NgZone, Component, OnDestroy, OnInit} from '@angular/core';
import {GameStateService} from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  private lastUpdatedTime: number = 0;

  constructor(private ngZone: NgZone, private gameStateService: GameStateService) {
    this.startGameLoop();

    console.log("STARTED");

    window.onbeforeunload = () => this.ngOnDestroy();
  }


  ngOnDestroy() {
    this.stopGameLoop();
  }

  startGameLoop(): void {
    this.gameStateService.loadSaveFromCookie()

    this.ngZone.runOutsideAngular(() => {
      this.lastUpdatedTime = performance.now();
      this.gameLoop();
    })
  }

  gameLoop(): void {
    requestAnimationFrame((currentTime) => {
      const deltaTime = (currentTime - this.lastUpdatedTime)/1000;
      this.updateGame(deltaTime);
      this.lastUpdatedTime = currentTime;

      // Repeat the loop
      this.gameLoop();
    })
  }

  private updateGame(deltaTime: number): void {
    this.gameStateService.addCoins(this.gameStateService["coinsPerSecond"] * deltaTime);
    this.gameStateService.onEnemyHit(this.gameStateService["damagePerSecond"] * deltaTime)
    this.gameStateService.checkIfUpgradeIsAvailable();
  }

  stopGameLoop(): void {
    this.gameStateService.saveToCookie();
  }
}
