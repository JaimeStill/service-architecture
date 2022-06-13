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
  selector: 'weapon-form',
  templateUrl: 'weapon.form.html',
  providers: [ ItemApi ]
})
export class WeaponForm implements AfterViewInit {
  @Input() form: FormGroup;

  get name() { return this.form?.get('name') }
  get weight() { return this.form?.get('weight') }
  get damage() { return this.form?.get('damage') }

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
