let contractAddressNile = "TJ1mmGhJJu1R4XpPnnCpeiaa9isz5AUvBW";
let contractAddressShasta = "TTq1A5gRfF81dtXJnLYU6cNGThBY5TLML8";
let contractAddress = undefined;
let contract = undefined;

export async function getTronWebAddress() {
  let tw = await window.tronWeb;
  if (tw === false) return undefined;

  const requestAccountsResponse = await tronLink.request({
    method: "tron_requestAccounts",
  });

  if (
    requestAccountsResponse.code === 4001 ||
    requestAccountsResponse.code === 4000
  ) {
    console.log(requestAccountsResponse.message);
    return undefined;
  }

  // console.log(`TronWeb successfully connected to your wallet`);

  return tw.defaultAddress;
}

export async function setContract() {
  let host = window.tronWeb.fullNode.host;
  if (host === "https://api.shasta.trongrid.io") {
    contractAddress = contractAddressShasta;
  } else if (host === "https://api.nileex.io") {
    contractAddress = contractAddressNile;
  } else {
    console.log("Please use Nile or Shasta testnet");
    return false;
  }

  contract = await window.tronWeb
    .contract()
    .at(contractAddress)
    .catch((err) => {
      console.log(err);
    });
  return true;
}

export async function payWriter(address, value) {
  if (contract === undefined) {
    // try to get the contract again
    setContract();
  }

  let result = await contract
    .payWriter(address)
    .send({
      feeLimit: 100_000_000,
      callValue: Math.round(window.tronWeb.toSun(value)),
      shouldPollResponse: false,
    })
    .then(() => {
      return {
        success: true,
        message: `Succesfully transferred ${value} NEAR`,
      };
    })
    .catch((err) => {
      let message;

      // rewrite some common error messages to more comprehensive messages
      if (
        err.message ===
        "Contract validate error : Validate InternalTransfer error, balance is not sufficient."
      ) {
        message = "Account balance is not sufficient.";
      } else if (
        err.message === "Contract validate error : account does not exist"
      ) {
        message = "Account balance is 0 or account doesn't exist.";
      } else {
        if (err === "Confirmation declined by user") {
          err = "You rejected to sign the transaction";
        }
        message = err.message || err;
      }
      return { success: false, message };
    });
  return { success: result.success, message: result.message };
}
