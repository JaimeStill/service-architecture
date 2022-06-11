import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Armor,
  ArmorApi,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket
} from 'core';

@Component({
  selector: 'armor-route',
  templateUrl: 'armor.route.html',
  providers: [SyncSocket]
})
export class ArmorRoute extends SyncRoute<Armor> implements OnDestroy {
  armorSrc: QuerySource<Armor>;

  constructor(
    protected sync: SyncSocket,
    public armorApi: ArmorApi
  ) {
    super(
      'armor',
      sync,
      ['armor', 'item'],
      (sync: Sync) => {
        console.log('sync armor refresh', sync);
        this.armorSrc.forceRefresh()
      }
    );

    this.armorSrc = armorApi.query();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.armorSrc.unsubscribe();
  }

  addArmor = () => this.trigger({categoryId: 1, name: 'test', url: 'test', type: 'armor', weight: 12, defense: 20} as Armor, false)
}
