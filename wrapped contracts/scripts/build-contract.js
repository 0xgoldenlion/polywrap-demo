const solc = require("solc");
const fs = require("fs");

async function main() {
  // Fetch the contract's source
  const contractSource = fs.readFileSync(
    `${__dirname}/../contracts/wrap.sol`, 'utf-8'
  );



  // Fetch the compiled contract's abi & bytecode
  const contract = output.contracts["wrap.sol"]["WRAP"];
  const abi = JSON.stringify(contract.abi);
  const bytecode = contract.evm.bytecode.object;

  // Generate an Assemblyscript file containing the abi + bytecode
  fs.writeFileSync(
    `${__dirname}/../src/contracts/wrap.ts`,
`/// NOTE: This file is auto-generate, see build-contract.js
export const abi = \`${abi}\`;
export const bytecode = "0x${bytecode}";
`
  );

  console.log("✔️ Generated wrap.ts");

  // Generate a JSON ABI file
  fs.writeFileSync(
    `${__dirname}/../src/contracts/wrap.json`,
    JSON.stringify({
      abi: contract.abi,
      bytecode: `0x${bytecode}`
    })
  );

  console.log("✔️ Generated wrap.json");
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
} else {
  module.exports = {
    main
  };
}
