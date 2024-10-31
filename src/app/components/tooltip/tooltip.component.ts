import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() position!: { x: number; y: number };
}
