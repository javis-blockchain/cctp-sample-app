import { Alert, Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import { Chain, CHAIN_TO_CHAIN_ID, CHAIN_TO_CHAIN_NAME } from 'constants/chains'
import useSwitchNetwork from 'hooks/useSwitchNetwork'

import type { Web3Provider } from '@ethersproject/providers'

interface Props {
  chain: string
  className?: string
}

const NetworkAlert: React.FC<Props> = ({ chain, className }) => {
  const { chainId } = useWeb3React<Web3Provider>()
  const { switchNetwork } = useSwitchNetwork(chain)
  if (
    chainId != null &&
    CHAIN_TO_CHAIN_ID[chain] !== chainId &&
    chain !== Chain.NOBLE
  ) {
    return (
      <Alert
        className={className}
        severity="error"
        action={
          <Button size="small" onClick={async () => await switchNetwork()}>
            Switch
          </Button>
        }
      >
        Source chain and selected network in wallet must be the same
      </Alert>
    )
  }
  return null
}

export default NetworkAlert
