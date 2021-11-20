import { context } from "near-sdk-core";
import { PostedMessage, messages, signers } from "./model";

// --- contract code goes below

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string, vote: string): void {
  const message = new PostedMessage(text, vote);

  const sender = context.sender;
  assert(
    !messages.contains(sender),
    "Sorry, you cannot sign the gues book twice."
  );
  assert(
    vote == "TABS" || vote == "SPACES",
    "Vote can be either 'TABS' or 'SPACES'."
  );
  messages.set(sender, message);
  signers.push(sender);
}

/**
 * Returns an array of all the messages.
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numSigners = signers.length;
  const result = new Array<PostedMessage>(numSigners);
  for (let i = 0; i < numSigners; i++) {
    result[i] = messages.getSome(signers[i]);
  }
  return result;
}
