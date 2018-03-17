import { AbstractControl, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const allowed = control.value >= 0 && control.value <= 2018;
    return allowed ? null : {'invalidYear': {value: control.value}};
  };
}

export function zurichLatitudeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let allowed = false;
    if (Number(control.value) && (control.value >= 46) && (control.value <= 48)) {
      allowed = true;
    }
    return allowed ? null : {'invalidLatitude': {value: control.value}};
  };
}

export function zurichLongitudeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let allowed = false;
    if (Number(control.value) && (control.value >= 7) && (control.value <= 9)) {
      allowed = true;
    }
    return allowed ? null : {'invalidLongitude': {value: control.value}};
  };
}