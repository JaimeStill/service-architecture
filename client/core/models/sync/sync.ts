interface SyncConfig {
  id: number | null,
  isRemoved: boolean
}

export class Sync {
  id: number | null;
  endpoint: string;
  isRemoved: boolean;

  constructor(
    endpoint: string,
    {
      id = null,
      isRemoved = false
    }: Partial<SyncConfig> = {}
  ) {
    this.id = id;
    this.endpoint = endpoint;
    this.isRemoved = isRemoved;
  }
}
