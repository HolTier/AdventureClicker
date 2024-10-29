import {Injectable, NgZone} from '@angular/core';
import {GameStateService} from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  private lastUpdatedTime: number = 0;

  constructor(private ngZone: NgZone, private gameStateService: GameStateService) {}

  startGameLoop(): void {
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
    this.gameStateService.addCoins(this.gameStateService["coinsPerSecond"] * (deltaTime));
  }

  ngOnDestroy(): void {

  }
}
