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
