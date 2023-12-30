import { useCallback, useState } from 'react'

import { Button, Fade, Menu, MenuItem } from '@mui/material'

import KeplrConnectWalletDialog from 'components/Keplr/KeplrConnectWalletDialog'
import { SupportedChainIdHex } from 'constants/chains'
import { useKeplrConnect } from 'hooks/useKeplrConnect'

const KeplrConnectWallet = () => {
  const cosmosChainId = SupportedChainIdHex.NOBLE_GRAND
  let { account, active, error } = useKeplrConnect()
  console.log('keplr account:%s, active:%s, error:%s', account, active, error)
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
    await navigator.clipboard.writeText(account ?? '')
    handleMenuClose()
  }, [account, handleMenuClose])

  const handleConnect = async () => {
    closeConnectWalletDialog()
    await window.keplr?.enable(cosmosChainId)
    if (!window.keplr) {
      error = 'Please Install Keplr Wallet Extension'
    } else {
      const accounts = await window.keplr.getKey(cosmosChainId)
      account = accounts.bech32Address
      active = true
    }
  }

  const handleDisconnect = useCallback(() => {
    handleMenuClose()
  }, [handleMenuClose])

  return (
    <>
      {account && active ? (
        <Button
          id="connected-wallet-button"
          aria-controls={open ? 'connected-wallet-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          {account}
        </Button>
      ) : (
        <div className="relative inline">
          <Button onClick={openConnectWalletDialog}>Connect Keplr</Button>
          {error !== '' && (
            <span className="absolute left-0 top-10 text-sm text-redhot-500">
              {error}
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
