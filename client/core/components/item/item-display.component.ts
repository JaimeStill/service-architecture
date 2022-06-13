import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  Category,
  Item
} from '../../models';

import { CategoryApi } from '../../apis';

@Component({
  selector: 'item-display',
  templateUrl: 'item-display.component.html',
  providers: [ CategoryApi ]
})
export class ItemDisplayComponent implements OnInit {
  category: Category;
  @Input() item: Item;

  constructor(
    public categoryApi: CategoryApi
  ) { }

  async ngOnInit(): Promise<void> {
    this.category = await this.categoryApi.find(this.item?.categoryId);
  }
}
