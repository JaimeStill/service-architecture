import {
  AfterViewInit,
  Component,
  Input
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { CategoryApi } from '../apis';
import { ApiValidator } from '../models';

@Component({
  selector: 'category-form',
  templateUrl: 'category.form.html',
  providers: [ CategoryApi ]
})
export class CategoryForm implements AfterViewInit {
  @Input() form: FormGroup;

  get value() { return this.form?.get('value') }

  constructor(
    private categoryApi: CategoryApi
  ) { }

  ngAfterViewInit(): void {
    ApiValidator.register(
      this.categoryApi.validate,
      this.form,
      this.value
    );
  }
}
