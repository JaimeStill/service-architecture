import {
  AbstractControl,
  FormGroup
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

export abstract class ApiValidator {
  private static setErrorState = (control: AbstractControl, error: string, value?: boolean) => {
    if (value) {
      const errors = control.errors
        ? {
          ...control.errors,
          [error]: value
        }
        : {
          [error]: value
        };

        control.setErrors(errors);
    } else if (control.errors) {
      if (control.errors.hasOwnProperty(error))
        delete control.errors[error];

      if (Object.keys(control.errors).length > 0)
        control.setErrors(control.errors)
      else
        control.setErrors(null);
    }
  }

  static register = async<T>(
    validator: (entity: T) => Promise<boolean>,
    form: FormGroup,
    control: AbstractControl,
    error: string = 'api'
  ) => {
    if (control.value) {
      const res = await validator(form.value);
      this.setErrorState(control, error, res ? null : true);
    }

    control
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(async (value: string) => {
        if (value) {
          const res = await validator(form.value);
          this.setErrorState(control, error, res ? null : true);
        } else
          this.setErrorState(control, error);
      })
  }
}
