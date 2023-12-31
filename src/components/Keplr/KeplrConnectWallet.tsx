import { useCallback, useState } from 'react'

import { Button, Fade, Menu, MenuItem } from '@mui/material'

import KeplrConnectWalletDialog from 'components/Keplr/KeplrConnectWalletDialog'
import { SupportedChainIdHex } from 'constants/chains'
import { useKeplrConnect } from 'hooks/useKeplrConnect'

const KeplrConnectWallet = () => {
  const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND
  const { keplrAccount, keplrActive, keplrError } = useKeplrConnect()
  console.log(
    'keplrAccount:%s, keplrActive:%s, keplrError:%s',
    keplrAccount,
    keplrActive,
    keplrError
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isConnectWalletDialogOpen, setIsConnectWalletDialogOpen] =
    useState<boolean>(false)
  const open = Boolean(anchorEl)

  const closeConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(false)
  }

  const openConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(true)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(keplrAccount ?? '')
    handleMenuClose()
  }, [keplrAccount, handleMenuClose])

  const handleConnect = async () => {
    closeConnectWalletDialog()
    await window.keplr?.enable(cosmosChainId)
    // if (!window.keplr) {
    //   keplrError = 'Please Install Keplr Wallet Extension'
    // } else {
    //   const accounts = await window.keplr.getKey(cosmosChainId)
    //   keplrAccount = accounts.bech32Address
    //   keplrActive = true
    // }
  }

  const handleDisconnect = useCallback(() => {
    handleMenuClose()
  }, [handleMenuClose])

  return (
    <>
      {keplrAccount && keplrActive ? (
        <Button
          id="connected-wallet-button"
          aria-controls={open ? 'connected-wallet-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          {keplrAccount}
        </Button>
      ) : (
        <div className="relative inline">
          <Button onClick={openConnectWalletDialog}>Connect Keplr</Button>
          {keplrError !== '' && (
            <span className="absolute left-0 top-10 text-sm text-redhot-500">
              {keplrError}
            </span>
          )}
        </div>
      )}
      <Menu
        id="connected-wallet-menu"
        MenuListProps={{
          'aria-labelledby': 'connected-wallet-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
      <KeplrConnectWalletDialog
        handleClose={closeConnectWalletDialog}
        handleConnect={handleConnect}
        open={isConnectWalletDialogOpen}
      />
    </>
  )
}

export default KeplrConnectWallet
