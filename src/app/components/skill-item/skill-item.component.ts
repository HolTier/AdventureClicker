import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage, NgStyle} from '@angular/common';
import {SkillItem} from '../../interfaces/upgrade.interface';

@Component({
  selector: 'app-skill-item',
  standalone: true,
    imports: [
        NgOptimizedImage,
        NgStyle,
        NgIf
    ],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.css'
})
export class SkillItemComponent {
  @Input() skillItem!: SkillItem;
}
