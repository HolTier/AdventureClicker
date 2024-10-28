import {Component, Input, ɵSafeValue} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-upgrade-item',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './upgrade-item.component.html',
  styleUrl: './upgrade-item.component.css'
})
export class UpgradeItemComponent {
  @Input() icon!: string;
  @Input() name!: string;
  @Input() cost!: string | number;
}
