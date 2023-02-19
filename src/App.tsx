import './App.css';
import React from 'react';
import { PolywrapClient } from '@polywrap/client-js';
import { setData, deployContract } from './wrapper/simplestorage';
import Logo from './logo.png';
import { ClientConfigBuilder } from '@polywrap/client-config-builder-js';
import { ethereumPlugin, Connections, Connection } from '@polywrap/ethereum-plugin-js';

interface Set {
  txReceipt: string;
  value: number;
}




export async function setupPolywrapClient(): Promise<PolywrapClient> {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
   const account =  await ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    throw Error('Please install Metamask.');
  }

  const connections = new Connections({
    networks: {
      goerli: new Connection({
        provider: ethereum,
      })
    },
    defaultNetwork: 'goerli',
  });

  const builder = new ClientConfigBuilder();
  const config = builder.addDefaults().addPlugin("ens/ethereum.polywrap.eth", ethereumPlugin({ connections })).build();
  return new PolywrapClient(config, { noDefaults: true });
}


function App() {
  const [client, setClient] = React.useState<PolywrapClient | undefined>(
    undefined
  );
  const [contract, setContract] = React.useState<string | undefined>(undefined);
  const [value, setValue] = React.useState<number>(0);
  const [sets, setSets] = React.useState<Set[]>([]);
  const addSet = (set: Set) => setSets([...sets, set]);

  const [inputValue, setInputValue] = React.useState<number>(0);

  const getClient = async () => {
    if (client) {
      return client;
    }

    const newClient = await setupPolywrapClient();
    console.log('Client:', newClient)
    setClient(newClient);
    return newClient;
  };


  const tab = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

  const link = (url: string, children: () => JSX.Element) => (
    <a target='_blank' rel='noopener noreferrer' href={url}>
      {children()}
    </a>
  );

  const emoji = (symbol: string) => (
    <span role='img' aria-label={symbol}>
      {symbol}
    </span>
  );

    const add =  async () => {
      const ethereum = (window as any).ethereum;
      const account =  await ethereum.request({ method: 'eth_requestAccounts' });
      return account[0];
    }

  const codeSyntax = (type: string) => (children: () => JSX.Element) =>
    <text className={type}>{children()}</text>;

  const syntax = {
    class: codeSyntax('Code-Class'),
    prop: codeSyntax('Code-Prop'),
    value: codeSyntax('Code-Value'),
    string: codeSyntax('Code-String'),
    variable: codeSyntax('Code-Variable'),
  };

  return (
    <div className='App'>
      {link('https://testnets.opensea.io/collection/wrap-1', () => (
        <img src={Logo}  />
      ))}
      <header className='App-body'>
        <h3 className='App-title'>
          Mint this nft w/ polywrap:
          <br />
          {link(
            'https://wrappers.io/v/ipfs/QmUPyhTLz16DS8iLxzuihnmRHXH3WPtmpzzVtmegsAaFSG',
            () => (
              <> IPFS</>
            )
          )}
        </h3>

          <>
            {emoji('🔌')} Set Metamask to Goerli
            <br />
            <button
              className='App-btn'
              onClick={async () =>
                deployContract(await add(), await getClient())
                  .then((address) => setContract(address))
                  .catch((err) => console.error(err))
              }
            >
              {emoji('🚀')} mint nft
            </button>
          
            <br />
          </>
        
      </header>
    </div>
  );
}

export default App;
