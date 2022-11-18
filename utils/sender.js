let contractId = "dev-1668761291081-76196698897457";

export async function connectSender() {
  if (!window.near.isSignedIn()) {
    let result = await window.near.requestSignIn({ contractId });
    if (result.error && result.error === "User reject") {
      console.log("Connection rejected");
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 sec
    await connectSender(); // recursive
  } else {
    console.log("Connected to Sender");
    console.log("Account ID: " + window.near.getAccountId());
    return true;
  }
}

export async function disconnectSender() {
  if (window.near.isSignedIn()) {
    await window.near.signOut();
  }
}

export async function pay(deposit, to, title) {
  // title is for reference only
  const tx = {
    receiverId: contractId,
    actions: [
      {
        methodName: "pay",
        args: { to, title },
        deposit: parseNearAmount(String(deposit)),
      },
    ],
  };

  const result = await window.near.signAndSendTransaction(tx).catch((err) => {
    console.log(err);
  });
  return result;
}

function parseNearAmount(amt) {
  if (!amt) return null;

  amt = amt.replace(/,/g, "").trim();
  const split = amt.split(".");
  const wholePart = split[0];
  const fracPart = split[1] || "";
  if (split.length > 2 || fracPart.length > 24) {
    throw new Error(`Cannot parse '${amt}' as NEAR amount`);
  }

  let padded = wholePart + fracPart.padEnd(24, "0");
  let trimmed = padded.replace(/^0+/, "");
  if (trimmed === "") return 0;
  return trimmed;
}
