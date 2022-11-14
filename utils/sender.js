let contractId = "dev-1668429151999-78994884464435";

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

export async function payAuthor(deposit = 1, author = "louweal.testnet") {
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
