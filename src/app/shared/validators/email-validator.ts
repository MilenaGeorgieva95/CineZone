 import {ValidatorFn} from '@angular/forms';
 
 export function emailValidator(domains: string[]): ValidatorFn {
    const domainsStr = domains.join('|');
    const regExp = new RegExp(`[A-Za-z]+@gmail.(${domainsStr})`);

    return (control) => {
      const isEmailInvalid: boolean =
        control.value === '' || regExp.test(control.value);
      return isEmailInvalid ? null : { emailValidator: true };
    };
  }