import { useEffect } from 'react'

import { SupportedChainIdHex } from 'constants/chains'

let keplrAccount = ''
let keplrActive = false
let keplrError = ''
export function useKeplrConnect() {
  const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND
  useEffect(() => {
    const initKeplrWallet = async () => {
      if (!window.keplr) {
        keplrError = 'Please Install Keplr Wallet Extension'
      } else {
        try {
          const accounts = await window.keplr.getKey(cosmosChainId)
          keplrAccount = accounts.bech32Address
          keplrActive = true
        } catch (e) {
          await addChainToKeplr()
        }
      }
      console.log('useKeplrConnect account: %s', keplrAccount)
    }
    void initKeplrWallet()
  }, [cosmosChainId])
  return { keplrAccount, keplrActive, keplrError }
}

async function addChainToKeplr() {
  await window.keplr?.experimentalSuggestChain(nobleGrandTestNet)
}

const nobleGrandTestNet = {
  chainId: 'grand-1',
  chainName: 'Noble',
  rpc: 'https://rpc.testnet.noble.strange.love',
  rest: 'https://api.testnet.noble.strange.love/',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'noble',
    bech32PrefixAccPub: 'noble' + 'pub',
    bech32PrefixValAddr: 'noble' + 'valoper',
    bech32PrefixValPub: 'noble' + 'valoperpub',
    bech32PrefixConsAddr: 'noble' + 'valcons',
    bech32PrefixConsPub: 'noble' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'USDC',
      coinMinimalDenom: 'uusdc',
      coinDecimals: 6,
      coinImageUrl:
        'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusdc.png',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'USDC',
      coinMinimalDenom: 'uusdc',
      coinDecimals: 6,
      coinImageUrl:
        'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/grand/uusdc.png',
      gasPriceStep: {
        low: 0.1,
        average: 0.1,
        high: 0.2,
      },
    },
  ],
}

const nobleMainNet = {
  chainId: 'noble-1',
  chainName: 'Noble',
  rpc: 'https://rpc-noble.keplr.app',
  rest: 'https://lcd-noble.keplr.app',
  chainSymbolImageUrl:
    'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/chain.png',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'noble',
    bech32PrefixAccPub: 'noble' + 'pub',
    bech32PrefixValAddr: 'noble' + 'valoper',
    bech32PrefixValPub: 'noble' + 'valoperpub',
    bech32PrefixConsAddr: 'noble' + 'valcons',
    bech32PrefixConsPub: 'noble' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'USDC',
      coinMinimalDenom: 'uusdc',
      coinDecimals: 6,
      coinGeckoId: 'usd-coin',
      coinImageUrl:
        'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/uusdc.png',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'USDC',
      coinMinimalDenom: 'uusdc',
      coinDecimals: 6,
      coinGeckoId: 'usd-coin',
      coinImageUrl:
        'https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/noble/uusdc.png',
      gasPriceStep: {
        low: 0.1,
        average: 0.1,
        high: 0.2,
      },
    },
  ],
  features: [],
}
