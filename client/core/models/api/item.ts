import { Category } from './category';
import { EntityBase } from '../entity-base';

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
