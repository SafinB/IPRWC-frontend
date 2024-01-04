import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-herobanner',
  templateUrl: './herobanner.component.html',
  styleUrls: ['./herobanner.component.scss']
})
export class HerobannerComponent {
  private scrollActivated = false;

  constructor(private elementRef: ElementRef) {}

  activateScroll() {
    this.scrollActivated = true;
    this.scrollToTarget();
  }

  scrollToTarget() {
    if (this.scrollActivated) {
      const targetElement = this.elementRef.nativeElement.querySelector('.scroll-target');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
