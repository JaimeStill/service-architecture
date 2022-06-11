import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket,
  Weapon,
  WeaponApi,
  WeaponSyncNode
} from 'core';

@Component({
  selector: 'weapons-route',
  templateUrl: 'weapons.route.html',
  providers: [SyncSocket]
})
export class WeaponsRoute extends SyncRoute<Weapon> implements OnDestroy {
  weaponSrc: QuerySource<Weapon>;

  constructor(
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
}
