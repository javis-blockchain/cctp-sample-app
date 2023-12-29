/**
 * List of all the chains/networks supported
 */
export enum Chain {
  ETH = 'ETH',
  AVAX = 'AVAX',
  ARB = 'ARB',
  BASE = 'BASE',
  // NOBLE = 'NOBLE',
  OP = 'OP',
  POLYGON = 'POLYGON',
}

/**
 * List of all the chain/network IDs supported
 */
export enum SupportedChainId {
  ETH_GOERLI = 5,
  AVAX_FUJI = 43113,
  ARB_GOERLI = 421613,
  BASE_GOERLI = 84531,
  OP_GOERLI = 420,
  POLYGON_MUMBAI = 80001,
}

/**
 * List of all the chain/network IDs supported in hexadecimals
 * TODO: Infer from SupportedChainId
 */
export const SupportedChainIdHex = {
  ETH_GOERLI: '0x5',
  AVAX_FUJI: '0xa869',
  ARB_GOERLI: '0x66eed',
  BASE_GOERLI: '0x14a33',
  OP_GOERLI: '0x1a4',
  POLYGON_MUMBAI: '0x13881',
}

interface ChainToChainIdMap {
  [key: string]: number
}

/**
 * Maps a chain to it's chain ID
 */

export const CHAIN_TO_CHAIN_ID: ChainToChainIdMap = {
  [Chain.ETH]: SupportedChainId.ETH_GOERLI,
  [Chain.AVAX]: SupportedChainId.AVAX_FUJI,
  [Chain.ARB]: SupportedChainId.ARB_GOERLI,
  [Chain.BASE]: SupportedChainId.BASE_GOERLI,
  [Chain.OP]: SupportedChainId.OP_GOERLI,
  [Chain.POLYGON]: SupportedChainId.POLYGON_MUMBAI,
}

interface ChainToChainNameMap {
  [key: string]: string
}

/**
 * Maps a chain to it's readable name
 */
export const CHAIN_TO_CHAIN_NAME: ChainToChainNameMap = {
  ETH: 'Ethereum',
  AVAX: 'Avalanche',
  ARB: 'Arbitrum',
  BASE: 'Base',
  OP: 'Optimism',
  POLYGON: 'Polygon',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === 'number') as SupportedChainId[]

/**
 * List of Circle-defined IDs referring to specific domains
 */
export enum DestinationDomain {
  ETH = 0,
  AVAX = 1,
  OP = 2,
  ARB = 3,
  NOBLE = 4,
  BASE = 6,
  POLYGON = 7,
}

// https://eips.ethereum.org/EIPS/eip-3085
interface AddEthereumChainParameter {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}

const ETH_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.ETH_GOERLI,
  blockExplorerUrls: ['https://goerli.etherscan.io'],
  chainName: 'Goerli Test Network',
  nativeCurrency: {
    name: 'Goerli ETH',
    symbol: 'gorETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.ankr.com/eth_goerli/'],
}

const AVAX_FUJI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.AVAX_FUJI,
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
}

const ARB_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.ARB_GOERLI,
  blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  chainName: 'Arbitrum Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
}

const BASE_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.BASE_GOERLI,
  blockExplorerUrls: ['https://goerli.basescan.org/'],
  chainName: 'Base Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://base-goerli.publicnode.com'],
}

const OP_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.OP_GOERLI,
  blockExplorerUrls: ['https://goerli-optimism.etherscan.io/'],
  chainName: 'Optimism Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://optimism-goerli.publicnode.com'],
}

const POLYGON_MUMBAI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.POLYGON_MUMBAI,
  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
  chainName: 'Polygon Mumbai Testnet',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://polygon-mumbai.blockpi.network/v1/rpc/public'],
}

interface ChainIdToChainParameters {
  [key: string]: AddEthereumChainParameter
}

export const CHAIN_ID_HEXES_TO_PARAMETERS: ChainIdToChainParameters = {
  [SupportedChainIdHex.ETH_GOERLI]: ETH_GOERLI,
  [SupportedChainIdHex.AVAX_FUJI]: AVAX_FUJI,
  [SupportedChainIdHex.ARB_GOERLI]: ARB_GOERLI,
  [SupportedChainIdHex.BASE_GOERLI]: BASE_GOERLI,
  [SupportedChainIdHex.OP_GOERLI]: OP_GOERLI,
  [SupportedChainIdHex.POLYGON_MUMBAI]: POLYGON_MUMBAI,
}
