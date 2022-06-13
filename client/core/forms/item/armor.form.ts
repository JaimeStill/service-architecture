import {
  AfterViewInit,
  Component,
  Input
} from '@angular/core';

import {
  CategoryApi,
  ItemApi
} from '../../apis';

import { FormGroup } from '@angular/forms';
import { ApiValidator } from '../../models';

@Component({
  selector: 'armor-form',
  templateUrl: 'armor.form.html',
  providers: [ ItemApi ]
})
export class ArmorForm implements AfterViewInit {
  @Input() form: FormGroup;

  get name() { return this.form?.get('name') }
  get weight() { return this.form?.get('weight') }
  get defense() { return this.form?.get('defense') }

  constructor(
    private itemApi: ItemApi,
    public categoryApi: CategoryApi
  ) { }

  ngAfterViewInit() {
    ApiValidator.register(
      this.itemApi.validate,
      this.form,
      this.name
    );
  }
}
