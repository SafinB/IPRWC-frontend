import { trigger, transition, style, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('600ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1 })),
  ]),
]);
