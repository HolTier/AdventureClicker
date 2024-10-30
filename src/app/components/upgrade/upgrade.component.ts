import { Component } from '@angular/core';
import {UpgradeItemComponent} from '../upgrade-item/upgrade-item.component';
import {GameStateService} from '../../core/game-state.service';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Items, Upgrade} from '../../interfaces/upgrade.interface';
import {Observable} from 'rxjs';
import {ItemComponent} from '../item/item.component';

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
    NgSwitchCase,
    ItemComponent
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {
  upgrade$: Observable<Upgrade[]> | undefined;
  items$: Observable<Items[]> | undefined;
  tabNumber: number = 0;

  constructor(private gameStateService: GameStateService) {
    this.upgrade$ = this.gameStateService.upgrade$;
    this.items$ = this.gameStateService.items$;
  }

  onUpgradeClick(upgrade: Upgrade): void {
    console.log('Upgrade clicked: ' + upgrade.name);
    this.gameStateService.levelUpUpgrade(upgrade);
  }
}
