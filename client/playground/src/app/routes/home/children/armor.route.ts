import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Armor,
  ArmorApi,
  ArmorDialog,
  ArmorSyncNode,
  ConfirmDialog,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket
} from 'core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'armor-route',
  templateUrl: 'armor.route.html',
  providers: [SyncSocket]
})
export class ArmorRoute extends SyncRoute<Armor> implements OnDestroy {
  armorSrc: QuerySource<Armor>;

  constructor(
    private dialog: MatDialog,
    protected sync: SyncSocket,
    public armorApi: ArmorApi
  ) {
    super(
      new ArmorSyncNode(),
      sync,
      (sync: Sync) => {
        console.log('sync armor refresh', sync);
        this.armorSrc.forceRefresh();
      }
    );

    this.armorSrc = armorApi.query();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.armorSrc.unsubscribe();
  }

  private spawnDialog = (armor: Armor) => this.dialog.open(ArmorDialog, {
    data: armor,
    disableClose: true
  })
  .afterClosed()
  .subscribe((result: Armor) => result && this.trigger(result));

  addArmor = () => this.spawnDialog({
    type: 'armor',
    name: '',
    weight: 0,
    defense: 0
  } as Armor);

  editArmor = (armor: Armor) => this.spawnDialog(Object.assign({} as Armor, armor));

  removeArmor = (armor: Armor) => this.dialog.open(ConfirmDialog, {
    data: {
      title: `Remove Armor?`,
      content: `Are you sure you want to remove armor ${armor.name}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(async (result: boolean) => {
    if (result) {
      const res = await this.armorApi.remove(armor);
      res && this.trigger(armor, true);
    }
  })
}
