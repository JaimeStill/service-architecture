import { CategoryDialogs } from './category';
import { ConfirmDialog } from './confirm/confirm.dialog';
import { ItemDialogs } from './item';

export const Dialogs = [
  ...CategoryDialogs,
  ...ItemDialogs,
  ConfirmDialog
];

export * from './category';
export * from './confirm';
export * from './item';
