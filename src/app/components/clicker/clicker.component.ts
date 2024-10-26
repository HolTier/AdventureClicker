import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.css'
})
export class ClickerComponent {
  imgSrc: string = "/images/orcAI1.webp"

  ClickerComponent(){
    // Take img from local assets
    //this.imgSrc = "/src/assets/images/orcAI1.webp";
  }
}
