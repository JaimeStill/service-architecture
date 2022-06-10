import { EntityBase } from '../entity-base';
import { Item } from './item';

export interface Category extends EntityBase {
  value: string;

  items?: Item[];
}
