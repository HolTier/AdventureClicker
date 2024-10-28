import { Component } from '@angular/core';
import {UpgradeItemComponent} from '../upgrade-item/upgrade-item.component';
import {GameStateService} from '../../core/game-state.service';

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [
    UpgradeItemComponent
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {
  constructor(private gameStateService: GameStateService) {
  }

  onUpgradeClick($event: any): void {
    console.log('Upgrade clicked');
    this.gameStateService.increaseCoinMultiplier(1);
  }
}
