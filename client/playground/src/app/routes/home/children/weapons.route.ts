import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Weapon,
  WeaponApi,
  QuerySource
} from 'core';

@Component({
  selector: 'weapons-route',
  templateUrl: 'weapons.route.html'
})
export class WeaponsRoute implements OnDestroy {
  weaponSrc: QuerySource<Weapon>;

  constructor(
    public weaponApi: WeaponApi
  ) {
    this.weaponSrc = weaponApi.query();
  }

  ngOnDestroy(): void {
    this.weaponSrc.unsubscribe();
  }
}
