import { Component } from '@angular/core';
import {ClickerComponent} from "../clicker/clicker.component";
import {UpgradeComponent} from "../upgrade/upgrade.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        ClickerComponent,
        UpgradeComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
