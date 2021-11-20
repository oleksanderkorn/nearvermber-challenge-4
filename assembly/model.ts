import { context, u128, PersistentMap, PersistentVector } from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  timestamp: u64;
  constructor(public text: string, public vote: string) {
    this.premium =
      context.attachedDeposit >= u128.from("10000000000000000000000");
    this.sender = context.sender;
    this.timestamp = context.blockTimestamp;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */

export const messages = new PersistentMap<string, PostedMessage>("m");
export const signers = new PersistentVector<string>("s");
