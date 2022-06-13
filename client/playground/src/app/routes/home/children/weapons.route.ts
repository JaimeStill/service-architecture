import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  ConfirmDialog,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket,
  Weapon,
  WeaponApi,
  WeaponDialog,
  WeaponSyncNode
} from 'core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'weapons-route',
  templateUrl: 'weapons.route.html',
  providers: [SyncSocket]
})
export class WeaponsRoute extends SyncRoute<Weapon> implements OnDestroy {
  weaponSrc: QuerySource<Weapon>;

  constructor(
    private dialog: MatDialog,
    protected sync: SyncSocket,
    public weaponApi: WeaponApi
  ) {
    super(
      new WeaponSyncNode(),
      sync,
      (sync: Sync) => {
        console.log('sync weapon refresh', sync);
        this.weaponSrc.forceRefresh();
      }
    );

    this.weaponSrc = weaponApi.query();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.weaponSrc.unsubscribe();
  }

  private spawnDialog = (weapon: Weapon) => this.dialog.open(WeaponDialog, {
    data: weapon,
    disableClose: true
  })
  .afterClosed()
  .subscribe((result: Weapon) => result && this.trigger(result));

  addWeapon = () => this.spawnDialog({
    type: 'weapon',
    name: '',
    weight: 0,
    damage: 0
  } as Weapon);

  editWeapon = (weapon: Weapon) => this.spawnDialog(Object.assign({} as Weapon, weapon));

  removeWeapon = (weapon: Weapon) => this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Remove Weapon?',
      content: `Are you sure you want to remove weapon ${weapon.name}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(async (result: boolean) => {
    if (result) {
      const res = await this.weaponApi.remove(weapon);
      res && this.trigger(weapon, true);
    }
  })
}
