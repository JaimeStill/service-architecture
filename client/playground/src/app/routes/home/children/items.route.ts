import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Item,
  ItemApi,
  ItemSyncNode,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket
} from 'core';

@Component({
  selector: 'items-route',
  templateUrl: 'items.route.html',
  providers: [SyncSocket]
})
export class ItemsRoute extends SyncRoute<Item> implements OnDestroy {
  itemSrc: QuerySource<Item>;

  constructor(
    protected sync: SyncSocket,
    public itemApi: ItemApi
  ) {
    super(
      new ItemSyncNode(),
      sync,
      (sync: Sync) => {
        console.log('sync item refresh', sync);
        this.itemSrc.forceRefresh()
      }
    );

    this.itemSrc = itemApi.query();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.itemSrc.unsubscribe();
  }
}
