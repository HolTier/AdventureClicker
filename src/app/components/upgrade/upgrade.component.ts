import { Component } from '@angular/core';
import {UpgradeItemComponent} from '../upgrade-item/upgrade-item.component';
import {GameStateService} from '../../core/game-state.service';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Upgrade} from '../../interfaces/upgrade.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [
    UpgradeItemComponent,
    NgIf,
    NgForOf,
    AsyncPipe,
    NgClass,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {
  upgrade$: Observable<Upgrade[]> | undefined;
  tabNumber: number = 0;

  constructor(private gameStateService: GameStateService) {
    this.upgrade$ = this.gameStateService.upgrade$;
  }

  onUpgradeClick(upgrade: Upgrade): void {
    console.log('Upgrade clicked: ' + upgrade.name);
    this.gameStateService.levelUpUpgrade(upgrade);
  }
}
