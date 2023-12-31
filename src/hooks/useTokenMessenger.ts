import { useCallback } from 'react'

import { SigningStargateClient } from '@cosmjs/stargate'
import { useWeb3React } from '@web3-react/core'
import { bech32 } from 'bech32'
import { type BigNumber, ethers } from 'ethers'

import { SupportedChainIdHex } from 'constants/chains'
import { TokenMessenger__factory } from 'typechain/index'
import { addressToBytes32 } from 'utils'
import { getTokenMessengerContractAddress } from 'utils/addresses'

import { nobleGrandTestNet } from './useKeplrConnect'

import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { AccountData } from '@keplr-wallet/types'
import type { DestinationDomain, SupportedChainId } from 'constants/chains'

/**
 * Returns a list of methods to call the Token Messenger contract
 * @param chainId the ID of the current connected chain/network
 */
const useTokenMessenger = (chainId: SupportedChainId | undefined) => {
  const { library } = useWeb3React<Web3Provider>()

  const TOKEN_MESSENGER_CONTRACT_ADDRESS =
    getTokenMessengerContractAddress(chainId)

  /**
   * Returns transaction response from contract call
   * @param amount the amount to be deposit for burn on source chain
   * @param destinationDomain the Circle defined ID of target chain
   * @param mintRecipient the recipient address on target chain
   * @param burnToken the address of token to burn
   */
  const depositForBurn = useCallback(
    async (
      amount: BigNumber,
      destinationDomain: DestinationDomain,
      mintRecipient: string,
      burnToken: string
    ) => {
      if (!library) return
      const contract = TokenMessenger__factory.connect(
        TOKEN_MESSENGER_CONTRACT_ADDRESS,
        library.getSigner()
      )

      let toAddress = addressToBytes32(mintRecipient)
      // noble address
      if (mintRecipient.startsWith('noble')) {
        const bech32Address = bech32.fromWords(
          bech32.decode(mintRecipient).words
        )
        const mintRecipientBytes = new Uint8Array(32)
        mintRecipientBytes.set(bech32Address, 32 - bech32Address.length)
        toAddress = ethers.utils.hexlify(mintRecipientBytes)
      }

      return await contract
        .depositForBurn(amount, destinationDomain, toAddress, burnToken)
        .then((response: TransactionResponse) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [TOKEN_MESSENGER_CONTRACT_ADDRESS, library]
  )

  const depositForBurnFromNoble = useCallback(
    async (
      amount: BigNumber,
      destinationDomain: DestinationDomain,
      rawMintRecipient: string
    ) => {
      const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND
      const accounts = await window.keplr?.getKey(cosmosChainId)
      // Mint recipient 0x7846d5ef33Be01e7386F80A2Ab59cb0Bea7d40Aa, left padded with 0's to 32 bytes
      const cleanedMintRecipient = rawMintRecipient.replace(/^0x/, '')
      const zeroesNeeded = 64 - cleanedMintRecipient.length
      const mintRecipient = '0'.repeat(zeroesNeeded) + cleanedMintRecipient
      const buffer = Buffer.from(mintRecipient, 'hex')
      const mintRecipientBytes = new Uint8Array(buffer)

      const msg = {
        typeUrl: '/circle.cctp.v1.MsgDepositForBurn',
        value: {
          from: accounts?.address,
          amount: amount.toString(),
          destinationDomain,
          mintRecipient: mintRecipientBytes,
          burnToken: 'uusdc',
        },
      }

      const fee = {
        amount: [
          {
            denom: 'uusdc',
            amount: '0',
          },
        ],
        gas: '200000',
      }
      const memo = ''
      if (window.keplr) {
        const offlineSigner = window.keplr.getOfflineSigner(cosmosChainId)
        const accountData: AccountData = (await offlineSigner.getAccounts())[0]
        const signingClient = await SigningStargateClient.connectWithSigner(
          nobleGrandTestNet.rpc,
          offlineSigner
        )
        return await signingClient
          .signAndBroadcast(accountData.address, [msg], fee, memo)
          .then((result) => {
            return result
          })
          .catch((error: Error) => {
            throw new Error(error.message)
          })
      }
      return null
    },
    []
  )

  return {
    depositForBurn,
    depositForBurnFromNoble,
  }
}

export default useTokenMessenger
