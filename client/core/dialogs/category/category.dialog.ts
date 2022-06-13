import {
  Component,
  Inject
} from '@angular/core';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { Category } from '../../models';

@Component({
  selector: 'category-dialog',
  templateUrl: 'category.dialog.html'
})
export class CategoryDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public category: Category,
    public dialog: MatDialogRef<CategoryDialog>
  ) { }
}
