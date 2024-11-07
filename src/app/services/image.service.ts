import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public images: string[] = [
    "images/orcAI1.webp",
    "images/chimeraAI1.jpg",
    "images/cerberAI1.jpg",
    "images/cerberAI2.jpg",
    "images/demonAI1.jpg",
    "images/goblinAI1.jpg",
    "images/mageAI1.jpg",
    "images/skeletonAI1.jpg",
    "images/trollAI1.jpg",
    "images/wolfAI1.jpg",
  ]
  private currentEnemyImage = new BehaviorSubject<string>(this.images[1])
  public currentEnemyImage$ = this.currentEnemyImage.asObservable();

  constructor() { }

  changeEnemyImage() {
    this.currentEnemyImage.next(this.images[Math.floor(Math.random() * this.images.length)]);
  }
}
