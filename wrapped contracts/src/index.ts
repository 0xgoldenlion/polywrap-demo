import {
  Ethereum_Module,
  Args_safeMint
} from "./wrap";
import { abi, bytecode } from "./contracts/wrap";

export function safeMint(args: Args_safeMint): string {
  const res = Ethereum_Module.callContractMethod({
    address: args.address,
    method: "function safeMint(address to) public returns (uint256)",
    args: [args.value],
    connection: args.connection
  }).unwrap();

  return res.hash;
}

