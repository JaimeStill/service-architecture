import {
  EntityBase,
  Sync,
  SyncNode
} from '../../models';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SyncSocket } from '../../sockets';

export abstract class SyncRoute<T extends EntityBase> {
  protected syncSub: Subscription;

  private checkListener = (data: Sync) =>
    (endpoint: string) =>
      endpoint.toLowerCase() === data.endpoint.toLowerCase();

  private filterState = (data: Sync) => {
    console.log('filterState', data);
    if (this.node.listeners.some(this.checkListener(data))) {
      if (this.id)
        return this.id === data.id
          ? true
          : false

      return true;
    } else
      return false;
  }

  constructor(
    protected node: SyncNode,
    protected sync: SyncSocket,
    protected refresh: (sync: Sync) => void,
    protected id: number | null = null
  ) {
    this.syncSub = sync.state$
      .pipe(
        filter((data: Sync | null) => data !== null && this.filterState(data))
      )
      .subscribe({
        next: this.refresh
      });
  }

  protected trigger = (data: T, isRemoved: boolean = false) =>
    this.sync.triggerSync(new Sync(
      this.node.endpoint,
      {
        id: data.id ? data.id : null,
        isRemoved
      }
    ))
}
