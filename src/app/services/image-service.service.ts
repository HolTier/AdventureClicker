import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  public images: string[] = [
    "images/orcAI1.webp",
    "chimeraAI1.jpg"
  ]
  constructor() { }
}
