export class SyncNode {
  endpoint: string;
  listeners: string[];

  constructor(
    endpoint: string,
    listeners: string[] = new Array<string>()
  ) {
    if (!(listeners.includes(endpoint)))
      listeners.push(endpoint);

    this.endpoint = endpoint;
    this.listeners = listeners;
  }
}
