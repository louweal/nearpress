import * as nearAPI from "near-api-js";
const { utils } = nearAPI;

let contractId = "dev-1668429151999-78994884464435"; //"dev-1668434647614-42036922570353" = docs

export async function connectSender() {
  if (!window.near.isSignedIn()) {
    try {
      await window.near
        .requestSignIn({
          contractId: contractId,
        })
        .catch((err) => {
          console.log(err);
          console.log("Failed to connect Sender");
        });
    } catch (err) {
      console.log(err);
    }
  }

  if (window.near.isSignedIn()) {
    console.log("Succesfully connected Sender");
    console.log("Account ID: " + window.near.getAccountId());
    return true;
  }
  console.log("Unknown error");
  return false;
}

export async function payAuthor(deposit, author) {
  const tx = {
    receiverId: contractId,
    actions: [
      {
        methodName: "payAuthor",
        args: {
          author: author,
        },
        // gas: 0.003 * 1e24,
        // deposit: deposit * 1e24,
        gas: utils.format.parseNearAmount(String(0.00003)),
        deposit: utils.format.parseNearAmount(String(deposit)),
      },
    ],
  };

  const result = await window.near.signAndSendTransaction(tx).catch((err) => {
    console.log(err);
  });
  return result;
}

export async function payAuthorDocs(deposit, author) {
  const tx = {
    receiverId: contractId,
    actions: [
      {
        methodName: "payAuthorDocs",
        args: {
          author: author,
        },
        gas: utils.format.parseNearAmount(String(0.00003)),
        deposit: utils.format.parseNearAmount(String(deposit)),
      },
    ],
  };

  const result = await window.near.signAndSendTransaction(tx);
  return result;
}
