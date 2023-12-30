import { useEffect } from 'react'

import { SupportedChainIdHex } from 'constants/chains'

const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND

export function useKeplrConnect() {
  let account = ''
  let active = false
  let error = ''
  useEffect(() => {
    const initKeplrWallet = async () => {
      if (!window.keplr) {
        error = 'Please Install Keplr Wallet Extension'
      } else {
        const accounts = await window.keplr.getKey(cosmosChainId)
        account = accounts.bech32Address
        active = true
      }
      console.log('useKeplrConnect account: %s', account)
      return { account, active, error }
    }
    void initKeplrWallet()
  }, [])
  return { account, active, error }
}
