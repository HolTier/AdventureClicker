import {Injectable, NgZone} from '@angular/core';
import {GameStateService} from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService {
  private gameLoopInterval: any = 0;

  constructor(private ngZone: NgZone, private gameStateService: GameStateService) {}

  startGameLoop(): void {
    this.ngZone.runOutsideAngular(() => {
      this.gameLoopInterval = setInterval(() => this.updateGame(), 1000)
    })
  }

  private updateGame(): void {
    this.gameStateService.addCoins(this.gameStateService["coinsPerSecond"]);
  }

  ngOnDestroy(): void {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
    }
  }
}
