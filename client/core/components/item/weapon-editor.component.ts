import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  GenerateWeaponForm,
  Weapon
} from '../../models';

import { WeaponApi } from '../../apis';

@Component({
  selector: 'weapon-editor',
  templateUrl: 'weapon-editor.component.html',
  providers: [ WeaponApi ]
})
export class WeaponEditorComponent implements OnInit {
  form: FormGroup;

  @Input() weapon: Weapon;
  @Input() label = 'Weapon';
  @Input() size: number = 360;
  @Input() cardStyle = 'p8';
  @Output() saved = new EventEmitter<Weapon>();

  constructor(
    private fb: FormBuilder,
    public weaponApi: WeaponApi
  ) { }

  ngOnInit() {
    this.weapon.type = this.weapon.type ?? 'weapon';
    this.form = GenerateWeaponForm(this.weapon, this.fb);
  }

  save = async () => {
    if (this.form?.valid) {
      const res = await this.weaponApi.save(this.form.value);
      res && this.saved.emit(res);
    }
  }
}
