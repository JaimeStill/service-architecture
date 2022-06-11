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
