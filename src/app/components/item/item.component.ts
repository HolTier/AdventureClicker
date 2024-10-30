import {Component, Input} from '@angular/core';
import {Items} from '../../interfaces/upgrade.interface';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item!: Items;
  isMouesOver: boolean = false;
}
