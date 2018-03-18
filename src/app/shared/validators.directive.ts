import { AbstractControl, ValidatorFn } from '@angular/forms';

/** The year must be a positive number, smaller than current year */
export function yearValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const allowed = control.value >= 0 && control.value <= 2018;
    return allowed ? null : {'invalidYear': {value: control.value}};
  };
}

/** The latitude must correspond to values around Zurich */
export function zurichLatitudeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let allowed = false;
    if (Number(control.value) && (control.value >= 46) && (control.value <= 48)) {
      allowed = true;
    }
    return allowed ? null : {'invalidLatitude': {value: control.value}};
  };
}

/** The longitude must correspond to values around Zurich */
export function zurichLongitudeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let allowed = false;
    if (Number(control.value) && (control.value >= 7) && (control.value <= 9)) {
      allowed = true;
    }
    return allowed ? null : {'invalidLongitude': {value: control.value}};
  };
}