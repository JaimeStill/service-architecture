import {
  Component,
  OnDestroy
} from '@angular/core';

import {
  Armor,
  ArmorApi,
  QuerySource
} from 'core';

@Component({
  selector: 'armor-route',
  templateUrl: 'armor.route.html'
})
export class ArmorRoute implements OnDestroy {
  armorSrc: QuerySource<Armor>;

  constructor(
    public armorApi: ArmorApi
  ) {
    this.armorSrc = armorApi.query();
  }

  ngOnDestroy(): void {
    this.armorSrc.unsubscribe();
  }
}
