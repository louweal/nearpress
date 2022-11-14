let contractId = "dev-1668429151999-78994884464435";

export async function connectSender() {
  if (!window.near.isSignedIn()) {
    let res = await window.near.requestSignIn({
      contractId: contractId,
    });
    console.log(res);
  }

  if (window.near.isSignedIn()) {
    console.log("Succesfully connected Sender");
  }
}

export async function payAuthor(deposit, author = "louweal.testnet") {
  const tx = {
    receiverId: contractId,
    actions: [
      {
        methodName: "payAuthor",
        args: {
          author: author,
        },
        gas: 0.003 * 1e24,
        deposit: deposit * 1e24,
      },
    ],
  };

  const result = await window.near.signAndSendTransaction(tx);
  return result;
}
