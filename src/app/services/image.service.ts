import { Injectable } from '@angular/core';

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
  constructor() { }
}
