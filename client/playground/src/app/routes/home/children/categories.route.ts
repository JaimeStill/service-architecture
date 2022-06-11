import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Category,
  CategoryApi,
  CategorySyncNode,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket
} from 'core';

@Component({
  selector: 'categories-route',
  templateUrl: 'categories.route.html',
  providers: [SyncSocket]
})
export class CategoriesRoute extends SyncRoute<Category> implements OnDestroy {
  categorySrc: QuerySource<Category>;

  constructor(
    protected sync: SyncSocket,
    public categoryApi: CategoryApi
  ) {
    super(
      new CategorySyncNode(),
      sync,
      (sync: Sync) => {
        console.log('sync category refresh', sync);
        this.categorySrc.forceRefresh();
      }
    );

    this.categorySrc = categoryApi.query();
  }

  ngOnDestroy(): void {
    this.syncSub.unsubscribe();
    this.categorySrc.unsubscribe();
  }
}
