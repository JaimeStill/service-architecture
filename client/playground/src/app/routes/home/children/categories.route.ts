import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Category,
  CategoryApi,
  QuerySource
} from 'core';

@Component({
  selector: 'categories-route',
  templateUrl: 'categories.route.html'
})
export class CategoriesRoute implements OnDestroy {
  categorySrc: QuerySource<Category>;

  constructor(
    public categoryApi: CategoryApi
  ) {
    this.categorySrc = categoryApi.query();
  }

  ngOnDestroy(): void {
    this.categorySrc.unsubscribe();
  }
}
