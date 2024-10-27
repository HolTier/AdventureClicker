import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage, NgStyle} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgStyle,
    FormsModule
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

  onClickerClick(event: MouseEvent): void {
    // Take coordinates
    const x = event.clientX;
    const y = event.clientY;

    // Add +1 to list
    this.clicks.push({x, y, value: '+1'})

    // Decrease the hp from monster
    this.healthValue -= 1;

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
