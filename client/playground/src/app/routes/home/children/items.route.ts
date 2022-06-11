import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Item,
  ItemApi,
  QuerySource,
  Sync,
  SyncNode,
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
      new SyncNode('item', ['armor', 'weapon']),
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
