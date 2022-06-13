import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  Armor,
  Category
} from '../../models';

import { CategoryApi } from '../../apis';

@Component({
  selector: 'armor-display',
  templateUrl: 'armor-display.component.html',
  providers: [ CategoryApi ]
})
export class ArmorDisplayComponent implements OnInit {
  category: Category;
  @Input() armor: Armor;

  constructor(
    public categoryApi: CategoryApi
  ) { }

  async ngOnInit(): Promise<void> {
    this.category = await this.categoryApi.find(this.armor?.categoryId);
  }
}
