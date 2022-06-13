import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { EntityBase } from '../entity-base';
import { Item } from './item';
import { SyncNode } from '../sync';

export interface Category extends EntityBase {
  value: string;

  items?: Item[];
}

export class CategorySyncNode extends SyncNode {
  constructor() {
    super('category');
  }
}

export const GenerateCategoryForm = (category: Category, fb: FormBuilder): FormGroup =>
  fb.group({
    id: [category?.id],
    value: [category?.value, Validators.required]
  });
