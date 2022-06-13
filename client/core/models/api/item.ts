import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Category } from './category';
import { EntityBase } from '../entity-base';
import { SyncNode } from '../sync';

export interface Item extends EntityBase {
  categoryId: number;
  type: string;
  name: string;
  url: string;
  weight: number;

  category?: Category;
}

export interface Armor extends Item {
  defense: number;
}

export interface Weapon extends Item {
  damage: number;
}

export class ItemSyncNode extends SyncNode {
  constructor() {
    super('item', ['armor', 'weapon', 'category']);
  }
}

export class ArmorSyncNode extends SyncNode {
  constructor() {
    super('armor', ['item', 'category']);
  }
}

export class WeaponSyncNode extends SyncNode {
  constructor() {
    super('weapon', ['item', 'category']);
  }
}

const ToItemForm = (item: Item) => {
  return {
    id: [item?.id],
    categoryId: [item?.categoryId, Validators.required],
    type: [item?.type],
    name: [item?.name, Validators.required],
    url: [item?.url],
    weight: [item?.weight, Validators.required]
  }
}

export const GenerateItemForm = (item: Item, fb: FormBuilder): FormGroup =>
  fb.group(ToItemForm(item));

export const GenerateArmorForm = (armor: Armor, fb: FormBuilder): FormGroup =>
  fb.group({
    ...ToItemForm(armor),
    defense: [armor?.defense, Validators.required],
  });

export const GenerateWeaponForm = (weapon: Weapon, fb: FormBuilder): FormGroup =>
  fb.group({
    ...ToItemForm(weapon),
    damage: [weapon?.damage, Validators.required]
  });
