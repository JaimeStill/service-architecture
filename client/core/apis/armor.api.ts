import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfig } from '../config';
import { Armor } from '../models';
import { QueryGeneratorService } from '../services';
import { EntityApi } from './entity.api';

@Injectable({
  providedIn: 'root'
})
export class ArmorApi extends EntityApi<Armor> {
  constructor(
    protected config: ServerConfig,
    protected generator: QueryGeneratorService,
    protected http: HttpClient
  ) {
    super('armor', config, generator, http);
  }

  queryByCategory = (categoryId: number) =>
    this.generator.generateSource<Armor>(
      `id`,
      `${this.endpoint}queryByCategory/${categoryId}`
    );
}
