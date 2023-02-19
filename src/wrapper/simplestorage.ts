import { PolywrapClient } from "@polywrap/client-js";

export const uri = "wrap://ipfs/QmUPyhTLz16DS8iLxzuihnmRHXH3WPtmpzzVtmegsAaFSG";

export async function setData(
  contract: string,
  value: number,
  client: PolywrapClient
): Promise<string> {

  const result = await client.invoke<string>({
    uri,
    method: "setData",
    args: {
      address: contract,
      value,
      connection: {
        networkNameOrChainId: "goerli"
      }
    },
  });

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}

export async function deployContract(
  value: string,
  client: PolywrapClient
): Promise<string> {

  const result = await client.invoke<string>({
    uri,
    method: "safeMint",
    args: {
      address: '0xA3AF26DFa3e5DC60C3c334c34711c702E06dAAbB',
      value,
      connection: {
        networkNameOrChainId: "goerli"
      }
    },
  });

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}
