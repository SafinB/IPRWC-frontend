import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {fadeAnimation} from "./shared/animaties/FadeAnimation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {

  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
