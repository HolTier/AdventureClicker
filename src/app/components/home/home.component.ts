import { Component } from '@angular/core';
import {ClickerComponent} from "../clicker/clicker.component";
import {UpgradeComponent} from "../upgrade/upgrade.component";
import {SkillPanelComponent} from '../skill-panel/skill-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ClickerComponent,
    UpgradeComponent,
    SkillPanelComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
