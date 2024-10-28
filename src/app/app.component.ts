import { Component } from '@angular/core';
import {ClickerComponent} from './components/clicker/clicker.component';
import { RouterOutlet } from '@angular/router';
import {UpgradeComponent} from './components/upgrade/upgrade.component';
import {GameLoopService} from './core/game-loop.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClickerComponent, UpgradeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AdventureClicker';

  constructor(private gameLoopService: GameLoopService) {
  }

  ngOnInit() {
    this.gameLoopService.startGameLoop();
  }
}
