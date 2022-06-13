import { CategoryComponents } from './category';
import { CoreComponents } from './core';
import { GenericComponents } from './generic';
import { ItemComponents } from './item';

export const Components = [
  ...CategoryComponents,
  ...CoreComponents,
  ...GenericComponents,
  ...ItemComponents
];

export * from './category';
export * from './core';
export * from './generic';
export * from './item';
