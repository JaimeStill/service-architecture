import {
  Category,
  Item
} from '../models';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerConfig } from '../config';
import { QueryGeneratorService } from '../services';
import { EntityApi } from './entity.api';

@Injectable({
  providedIn: 'root'
})
export class CategoryApi extends EntityApi<Category> {
  constructor(
    protected config: ServerConfig,
    protected generator: QueryGeneratorService,
    protected http: HttpClient
  ) {
    super('category', config, generator, http);
  }

  all$: Observable<Category[]> = this.http.get<Category[]>(`${this.api}getAll`);

  all = (): Promise<Category[]> =>
    this.execute(this.all$);

  items$ = (categoryId: number): Observable<Item[]> =>
    this.http.get<Item[]>(`${this.api}getItems/${categoryId}`);

  items = (categoryId: number): Promise<Item[]> =>
    this.execute(this.items$(categoryId));

  validate = (category: Category): Promise<boolean> =>
    new Promise((resolve, reject) => {
      this.http.post<boolean>(`${this.api}validate`, category)
        .subscribe({
          next: (data: boolean) => resolve(data),
          error: (err: any) => reject(err)
        })
    });
}
