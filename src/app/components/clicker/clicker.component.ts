import { Component } from '@angular/core';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {firstValueFrom, Observable} from 'rxjs';
import {GameStateService} from '../../core/game-state.service';
import {TooltipComponent} from '../tooltip/tooltip.component';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgStyle,
    FormsModule,
    AsyncPipe,
    DecimalPipe,
    TooltipComponent,
    NgIf
  ],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.css'
})
export class ClickerComponent {
  // Take img from local assets
  imgSrc: string = "/images/orcAI1.webp"
  clicks: { x: number; y: number; value: string }[] = [];
  coins$: Observable<number>;
  clickMultiplier$: Observable<number>;
  enemyMaxHealth$: Observable<number>;
  enemyCurrentHealth$: Observable<number>;
  enemyCurrentImage$: Observable<string>;

  constructor(private gameStateService: GameStateService, private imageService: ImageService) {
    this.coins$ = this.gameStateService.coins$;
    this.clickMultiplier$ = this.gameStateService.clickMultiplier$;
    this.enemyMaxHealth$ = this.gameStateService.enemyMaxHealth$;
    this.enemyCurrentHealth$ = this.gameStateService.enemyCurrentHealth$;
    this.enemyCurrentImage$ = this.imageService.currentEnemyImage$;
  }

  onClickerClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement; // Get the clicked element
    const rect = target.getBoundingClientRect(); // Get the element's position and dimensions

    // Adjust coordinates
    const x = event.clientX - rect.left + 6;
    const y = event.clientY - rect.top - 12;

    // Add +1 to list
    this.clicks.push({x, y, value: '+1'})

    // Increase coins
    this.gameStateService.addCoins(1);

    // Hit the enemy
    this.gameStateService.onEnemyHit(1);

    // Delete +1 from list
    setTimeout(() => {
      this.clicks.shift();
    }, 1000);
  }

  protected readonly Math = Math;
}
