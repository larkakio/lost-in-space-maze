export interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

export interface FarcasterContext {
  user: FarcasterUser;
}

export interface FarcasterSDK {
  actions: {
    ready: () => Promise<void>;
    openUrl: (url: string) => Promise<void>;
    close: () => Promise<void>;
  };
  context: Promise<FarcasterContext>;
}
