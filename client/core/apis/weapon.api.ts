import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../config';
import { Weapon } from '../models';
import { QueryGeneratorService } from '../services';
import { EntityApi } from './entity.api';

@Injectable({
  providedIn: 'root'
})
export class WeaponApi extends EntityApi<Weapon> {
  constructor(
    protected config: ServerConfig,
    protected generator: QueryGeneratorService,
    protected http: HttpClient
  ) {
    super('weapon', config, generator, http);
  }

  queryByCategory = (categoryId: number) =>
    this.generator.generateSource<Weapon>(
      `id`,
      `${this.endpoint}queryByCategory/${categoryId}`
    );
}
