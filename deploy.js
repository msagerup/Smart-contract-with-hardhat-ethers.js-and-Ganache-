const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  console.log(ethers.JsonRpcProvider);
  const provider = new ethers.providers.JsonRpcProvider(
    "http://172.22.176.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0x8bbbf5ce687754d4d6e7a86342def97d3bc3c1a025d43a7473376baeb2781c2b",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contract...");
  const contract = await contractFactory.deploy();
  const transactionReciept = await contract.deployTransaction.wait(1);

  console.log("Here is the deployment transaction: ");
  console.log(contract.deployTransaction);
  console.log("Here is the transaction receipt: ");
  console.log({ transactionReciept });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
