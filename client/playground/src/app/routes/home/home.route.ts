import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Armor,
  ArmorApi,
  Category,
  CategoryApi,
  GarbageService,
  Item,
  ItemApi,
  QuerySource,
  Weapon,
  WeaponApi
} from 'core';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html',
  providers: [ GarbageService ]
})
export class HomeRoute implements OnInit, OnDestroy {
  armorSrc: QuerySource<Armor>;
  categorySrc: QuerySource<Category>;
  itemSrc: QuerySource<Item>;
  weaponSrc: QuerySource<Weapon>;

  constructor(
    private garbage: GarbageService,
    public armorApi: ArmorApi,
    public categoryApi: CategoryApi,
    public itemApi: ItemApi,
    public weaponApi: WeaponApi
  ) {
    this.armorSrc = armorApi.query();
    this.categorySrc = categoryApi.query();
    this.itemSrc = itemApi.query();
    this.weaponSrc = weaponApi.query();
  }

  ngOnInit(): void {
    this.garbage.registerSources(
      this.armorSrc, this.categorySrc,
      this.itemSrc, this.weaponSrc
    )
  }

  ngOnDestroy(): void {
    this.garbage.clean();
  }
}
