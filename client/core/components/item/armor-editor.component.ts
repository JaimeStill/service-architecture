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
  Armor,
  GenerateArmorForm
} from '../../models';

import { ArmorApi } from '../../apis';

@Component({
  selector: 'armor-editor',
  templateUrl: 'armor-editor.component.html',
  providers: [ ArmorApi ]
})
export class ArmorEditorComponent implements OnInit {
  form: FormGroup;

  @Input() armor: Armor;
  @Input() label = 'Armor';
  @Input() size: number = 360;
  @Input() cardStyle = 'p8';
  @Output() saved = new EventEmitter<Armor>();

  constructor(
    private fb: FormBuilder,
    public armorApi: ArmorApi
  ) { }

  ngOnInit() {
    this.armor.type = this.armor.type ?? 'armor';
    this.form = GenerateArmorForm(this.armor, this.fb);
  }

  save = async () => {
    if (this.form?.valid) {
      const res = await this.armorApi.save(this.form.value);
      res && this.saved.emit(res);
    }
  }
}
