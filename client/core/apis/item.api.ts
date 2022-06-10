import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config';
import { Item } from '../models';
import { QueryGeneratorService } from '../services';
import { EntityApi } from './entity.api';

@Injectable({
  providedIn: 'root'
})
export class ItemApi extends EntityApi<Item> {
  constructor(
    protected config: ServerConfig,
    protected generator: QueryGeneratorService,
    protected http: HttpClient
  ) {
    super('item', config, generator, http);
  }

  findByName$ = (url: string): Observable<Item> =>
    this.http.get<Item>(`${this.api}findByName/${url}`);

  findByName = (url: string): Promise<Item> =>
    this.execute(this.findByName$(url));
}
