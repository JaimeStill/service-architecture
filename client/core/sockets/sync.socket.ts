import {
  HubConnection,
  HubConnectionBuilder
} from '@microsoft/signalr';

import {
  SocketState,
  Sync
} from '../models';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerConfig } from '../config';
import { SnackerService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class SyncSocket {
  private endpoint = 'http://localhost:5000/sync';
  private connection: HubConnection;

  private socket = new BehaviorSubject<SocketState>(null);
  private state = new BehaviorSubject<Sync>(null);

  socket$ = this.socket.asObservable();
  state$ = this.state.asObservable();

  constructor(
    private config: ServerConfig,
    private snacker: SnackerService
  ) {
    if (config)
      this.endpoint = `${config.server}sync`;

    this.connection = new HubConnectionBuilder()
      .withUrl(this.endpoint, {
        withCredentials: true
      })
      .build();

    this.connection.on(
      'sync',
      (data: Sync) => {
        this.snacker.sendColorMessage(`SyncSocket: sync received`, ['snacker-indigo']);
        this.state.next(data)
      }
    );

    this.connection
      .start()
      .then(() => this.socket.next({
        connected: true,
        error: null
      }))
      .catch((error: any) => this.socket.next({
        connected: false,
        error
      }));
  }

  triggerSync = async (sync: Sync) => {
    if (this.socket.value.connected) {
      await this.connection
        .invoke('triggerSync', sync);
    }
  }
}
