export interface EventRo {
  eventName: string;
  collection: string;
  name?: string;
  symbol?: string;
  tokenId?: number;
  tokenURI?: string;
  recipient?: string;
}