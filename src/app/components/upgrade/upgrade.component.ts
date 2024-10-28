import { Component } from '@angular/core';
import {UpgradeItemComponent} from '../upgrade-item/upgrade-item.component';

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [
    UpgradeItemComponent
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.css'
})
export class UpgradeComponent {

}
