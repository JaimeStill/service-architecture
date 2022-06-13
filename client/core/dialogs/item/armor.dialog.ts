import {
  Component,
  Inject
} from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Armor } from '../../models';

@Component({
  selector: 'armor-dialog',
  templateUrl: 'armor.dialog.html'
})
export class ArmorDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public armor: Armor,
    public dialog: MatDialogRef<ArmorDialog>
  ) { }
}
