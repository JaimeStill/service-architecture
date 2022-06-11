import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {
  ArmorApi,
  CategoryApi
} from '../../apis';

import { Armor } from '../../models';

@Component({
  selector: 'armor-dialog',
  templateUrl: 'armor.dialog.html',
  providers: [
    ArmorApi,
    CategoryApi
  ]
})
export class ArmorDialog implements OnInit {
  constructor(
    private armorApi: ArmorApi,
    private dialog: MatDialogRef<ArmorDialog>,
    public categoryApi: CategoryApi,
    @Inject(MAT_DIALOG_DATA) public armor: Armor
  ) { }

  ngOnInit() {

  }
}
