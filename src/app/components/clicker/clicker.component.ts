import { Component } from '@angular/core';
import {NgForOf, NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgStyle
  ],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.css'
})
export class ClickerComponent {
  // Take img from local assets
  imgSrc: string = "/images/orcAI1.webp"
  clicks: { x: number; y: number; value: string }[] = [];

  onClickerClick(event: MouseEvent): void {
    // Take coordinates
    const x = event.clientX;
    const y = event.clientY;

    // Add +1 to list
    this.clicks.push({x, y, value: '+1'})

    // Delete +1 from list
    setTimeout(() => {
      this.clicks.shift();
    }, 1000)
  }
}
