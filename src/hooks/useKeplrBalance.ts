import { useMemo } from 'react'

import { BigNumber } from 'ethers'

import { SupportedChainIdHex } from 'constants/chains'

import { nobleGrandTestNet } from './useKeplrConnect'

let keplrUSDCBalance = BigNumber.from(0)

export const useKeplrBalance = () => {
  const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND
  useMemo(() => {
    const getBalance = async () => {
      const key = await window.keplr?.getKey(cosmosChainId)
      if (key) {
        const uri = `${nobleGrandTestNet.rest}/cosmos/bank/v1beta1/balances/${key.bech32Address}?pagination.limit=100`

        const response = await fetch(uri)
        const data = await response.json()
        console.log('data:', data)
        const balance = data.balances.find(
          (balanceObj: { denom: string }) => balanceObj.denom === 'uusdc'
        )
        keplrUSDCBalance = BigNumber.from(balance.amount)
      }
    }
    void getBalance()
  }, [cosmosChainId])
  return keplrUSDCBalance
}
