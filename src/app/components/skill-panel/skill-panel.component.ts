import { Component } from '@angular/core';
import {GameLoopService} from '../../core/game-loop.service';
import {Observable} from 'rxjs';
import {SkillItem} from '../../interfaces/upgrade.interface';
import {GameStateService} from '../../core/game-state.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {SkillItemComponent} from '../skill-item/skill-item.component';

@Component({
  selector: 'app-skill-panel',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    SkillItemComponent,
    NgIf
  ],
  templateUrl: './skill-panel.component.html',
  styleUrl: './skill-panel.component.css'
})
export class SkillPanelComponent {
  skillItems$: Observable<SkillItem[]> | undefined;

  constructor(private gameStateService: GameStateService) {
    this.skillItems$ = this.gameStateService.skillItems$;
  }
}
