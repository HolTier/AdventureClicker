import { Component } from '@angular/core';
import {AsyncPipe, NgForOf, NgOptimizedImage, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ImageService} from '../../services/image.service';
import {Observable} from 'rxjs';
import {GameStateService} from '../../core/game-state.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgStyle,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.css'
})
export class ClickerComponent {
  // Take img from local assets
  imgSrc: string = "/images/orcAI1.webp"
  clicks: { x: number; y: number; value: string }[] = [];
  enemyHealth: number = 100;
  healthValue: any = 100;
  images: ImageService = new ImageService();
  coins$: Observable<number>;
  coinMultiplier$: Observable<number>;

  constructor(private gameStateService: GameStateService) {
    this.coins$ = this.gameStateService.coins$;
    this.coinMultiplier$ = this.gameStateService.coinMultiplier$;
  }

  onClickerClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement; // Get the clicked element
    const rect = target.getBoundingClientRect(); // Get the element's position and dimensions

    // Adjust coordinates
    const x = event.clientX - rect.left + 6;
    const y = event.clientY - rect.top - 12;

    // Add +1 to list
    this.clicks.push({x, y, value: '+1'})

    // Decrease the hp from monster
    this.healthValue -= 1;

    // Increase coins
    this.gameStateService.addCoins(1);

    if (this.healthValue <= 0) {
      this.healthValue = 100;
      this.imgSrc = this.images.images[Math.floor(Math.random() * this.images.images.length)];
    }

    // Delete +1 from list
    setTimeout(() => {
      this.clicks.shift();
    }, 1000)
  }
}
