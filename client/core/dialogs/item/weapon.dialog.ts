import {
  Component,
  Inject
} from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Weapon } from '../../models';

@Component({
  selector: 'weapon-dialog',
  templateUrl: 'weapon.dialog.html'
})
export class WeaponDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public weapon: Weapon,
    public dialog: MatDialogRef<WeaponDialog>
  ) { }
}
