/* eslint-disable prettier/prettier */
import { SupportedChainId } from 'constants/chains'

/**
 * Map of supported chains to USDC contract addresses
 */
export const CHAIN_IDS_TO_USDC_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  [SupportedChainId.AVAX_FUJI]: '0x5425890298aed601595a70AB815c96711a31Bc65',
  [SupportedChainId.ARB_GOERLI]: '0xfd064a18f3bf249cf1f87fc203e90d8f650f2d63',
  [SupportedChainId.OP_GOERLI]: '0xe05606174bac4A6364B31bd0eCA4bf4dD368f8C6',
  [SupportedChainId.POLYGON_MUMBAI]:
    '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97',
}

/**
 * Map of supported chains to Token Messenger contract addresses
 */
export const CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8',
  [SupportedChainId.AVAX_FUJI]: '0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0',
  [SupportedChainId.ARB_GOERLI]: '0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352',
  [SupportedChainId.OP_GOERLI]: '0x23A04D5935ed8bC8E3eB78dB3541f0ABfB001c6e',
  [SupportedChainId.POLYGON_MUMBAI]:
    '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
}

/**
 * Map of supported chains to Message Transmitter contract addresses
 */
export const CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0x26413e8157cd32011e726065a5462e97dd4d03d9',
  [SupportedChainId.AVAX_FUJI]: '0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79',
  [SupportedChainId.ARB_GOERLI]: '0x109bc137cb64eab7c0b1dddd1edf341467dc2d35',
  [SupportedChainId.OP_GOERLI]: '0x9ff9a4da6f2157A9c82CE756f8fD7E0d75be8895',
  [SupportedChainId.POLYGON_MUMBAI]:
    '0xe09A679F56207EF33F5b9d8fb4499Ec00792eA73',
}
