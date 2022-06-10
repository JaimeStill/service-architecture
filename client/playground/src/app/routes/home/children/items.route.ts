import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Item,
  ItemApi,
  QuerySource
} from 'core';

@Component({
  selector: 'items-route',
  templateUrl: 'items.route.html'
})
export class ItemsRoute implements OnDestroy {
  itemSrc: QuerySource<Item>;

  constructor(
    public itemApi: ItemApi
  ) {
    this.itemSrc = itemApi.query();
  }

  ngOnDestroy(): void {
    this.itemSrc.unsubscribe();
  }
}
