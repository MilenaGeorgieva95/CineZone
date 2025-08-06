import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator, OnChanges {
  @Input() appEmail: string[] = [];
  constructor() {}

  validator: ValidatorFn = () => null;

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue } = changes['appEmail'];
    if (currentValue?.length) {
      this.validator = this.emailValidator(currentValue);
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  emailValidator(domains: string[]): ValidatorFn {
    const domainsStr = domains.join('|');
    const regExp = new RegExp(`[A-Za-z]+@gmail.(${domainsStr})`);

    return (control) => {
      const isEmailInvalid: boolean =
        control.value === '' || regExp.test(control.value);
      return isEmailInvalid ? null : { emailValidator: true };
    };
  }
}