import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Category,
  CategoryApi,
  CategoryDialog,
  CategorySyncNode,
  ConfirmDialog,
  QuerySource,
  Sync,
  SyncRoute,
  SyncSocket
} from 'core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'categories-route',
  templateUrl: 'categories.route.html',
  providers: [SyncSocket]
})
export class CategoriesRoute extends SyncRoute<Category> implements OnDestroy {
  categorySrc: QuerySource<Category>;

  constructor(
    private dialog: MatDialog,
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

  private spawnDialog = (category: Category) => this.dialog.open(CategoryDialog, {
    data: category,
    disableClose: true
  })
  .afterClosed()
  .subscribe((result: Category) => result && this.trigger(result));

  addCategory = () => this.spawnDialog({
    value: ''
  } as Category);

  editCategory = (category: Category) => this.spawnDialog(Object.assign({} as Category, category));

  removeCategory = (category: Category) => this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Remove Category?',
      content: `Are you sure you want to remove category ${category.value}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(async (result: boolean) => {
    if (result) {
      const res = await this.categoryApi.remove(category);
      res && this.trigger(category, true);
    }
  })
}
