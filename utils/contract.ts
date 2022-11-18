// provided for reference only. Deployed as 'dev-1668761291081-76196698897457' using Gitpod
import { NearBindgen, call, near } from "near-sdk-js";

@NearBindgen({})
class NearPress {
  @call({ payableFunction: true })
  pay({ to, title }: { to: string; title: string }) {
    let amount: bigint = near.attachedDeposit() as bigint;
    const promise = near.promiseBatchCreate(to);
    near.promiseBatchActionTransfer(promise, amount);
  }
}
