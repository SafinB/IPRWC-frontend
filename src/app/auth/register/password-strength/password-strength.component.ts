import {Component, OnChanges} from '@angular/core';
import {EventEmitter, Input, Output, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges{

  @Input() public passwordToCheck?: null
  @Output() passwordMessage = new EventEmitter<string>();
  @Output() passwordStrength: EventEmitter<boolean> = new EventEmitter<boolean>();

  bar0: string;
  bar1: string;
  bar2: string;
  msg = '';

  constructor() {
    this.bar0 = '';
    this.bar1 = '';
    this.bar2 = '';
    this.passwordToCheck = null;
    this.msg = '';
  }

  checkStrength(password: string) {
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(password);
    const upperLetters = /[A-Z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);
    const length = password.length >= 10;

    const flags = [lowerLetters, upperLetters, numbers, symbols, length];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag ? 1 : 0;
    }
    return passedMatches;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (changes['passwordToCheck'] && changes['passwordToCheck'].currentValue !== null) {
      this.resetBarColors();
      const score = this.checkStrength(changes['passwordToCheck'].currentValue);
      this.setBarColors(score);
      if (score != 5) {
        this.msg = 'Een wachtwoord moet minimaal 10 tekens bevatten en minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken.';
        this.passwordStrength.emit(false);
        this.passwordMessage.emit(this.msg);
      } else {
        this.msg = '';
        this.passwordStrength.emit(true);
        this.passwordMessage.emit(this.msg);
      }
    }
  }

  setBarColors(score: number) {
    if (score === 5) {
      this.bar0 = 'green';
      this.bar1 = 'green';
      this.bar2 = 'green';
    } else if (score >= 3 && score < 5) {
      this.bar0 = 'orange';
      this.bar1 = 'orange';
      this.bar2 = '#DDD';
    } else if (score >= 1 && score < 3) {
      this.bar0 = 'red';
      this.bar1 = '#DDD';
      this.bar2 = '#DDD';
    }
  }

  resetBarColors() {
    this.bar0 = '#DDD';
    this.bar1 = '#DDD';
    this.bar2 = '#DDD';
  }

  getPopoverMessage(): string {
    return this.msg;
  }
}
