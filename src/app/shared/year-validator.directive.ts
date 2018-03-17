import { AbstractControl, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const allowed = control.value >= 0 && control.value < 2018;
    return allowed ? null : {'invalidYear': {value: control.value}};
  };
}