import { Component } from '@angular/core';
import {UpgradeItemComponent} from '../upgrade-item/upgrade-item.component';
import {GameStateService} from '../../core/game-state.service';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {Items, Upgrade} from '../../interfaces/upgrade.interface';
import {Observable} from 'rxjs';
import {ItemComponent} from '../item/item.component';
import {TooltipComponent} from '../tooltip/tooltip.component';

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
    ItemComponent,
    TooltipComponent
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {
  upgrade$: Observable<Upgrade[]> | undefined;
  items$: Observable<Items[]> | undefined;
  tabNumber: number = 0;
  isTooltipActive: boolean = false;
  tooltipName: string = '';
  tooltipDescription: string = '';
  tooltipPosition: {x: number, y: number} = {x: 0, y: 0};
  tooltipCost: string | number = 0;

  constructor(private gameStateService: GameStateService) {
    this.upgrade$ = this.gameStateService.upgrade$;
    this.items$ = this.gameStateService.items$;
  }

  onUpgradeClick(upgrade: Upgrade): void {
    console.log('Upgrade clicked: ' + upgrade.name);
    this.gameStateService.levelUpUpgrade(upgrade);
  }

  onHoverItem($event: MouseEvent, item: Items) {
    if(!this.isTooltipActive || item.name != this.tooltipName) {
      this.tooltipName = item.name;
      this.tooltipDescription = item.name;
      this.tooltipCost = item.cost;
      this.tooltipPosition = {x: $event.clientX, y: $event.clientY};
      this.isTooltipActive = true;
    }
  }

  hideTooltip() {
    this.isTooltipActive = false;
  }

  onItemClick($event: MouseEvent, item: Items) {
    item.effect();
    item.isPurchased = true;
    console.log('item clicked: ' + item);
  }
}
