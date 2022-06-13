import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  Category,
  Weapon
} from '../../models';

import { CategoryApi } from '../../apis';

@Component({
  selector: 'weapon-display',
  templateUrl: 'weapon-display.component.html',
  providers: [ CategoryApi ]
})
export class WeaponDisplayComponent implements OnInit {
  category: Category;
  @Input() weapon: Weapon;

  constructor(
    public categoryApi: CategoryApi
  ) { }

  async ngOnInit(): Promise<void> {
    this.category = await this.categoryApi.find(this.weapon?.categoryId);
  }
}
