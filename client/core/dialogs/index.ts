import { ConfirmDialog } from './confirm/confirm.dialog';
import { ItemDialogs } from './item';

export const Dialogs = [
  ...ItemDialogs,
  ConfirmDialog
];

export * from './confirm';
export * from './item';
