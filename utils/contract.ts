// provided for reference only. Deployed as 'dev-1668683282310-63076526738395' using Gitpod
import { NearBindgen, call, near } from "near-sdk-js";

@NearBindgen({})
class NearPress {
  @call({ payableFunction: true })
  payAuthor({ author, title }: { author: string; title: string }) {
    let amount: bigint = near.attachedDeposit() as bigint;
    const promise = near.promiseBatchCreate(author);
    near.promiseBatchActionTransfer(promise, amount);
  }
}
