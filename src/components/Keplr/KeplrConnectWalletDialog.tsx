import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import IconKeplr from 'assets/icon-keplr.png'
import KeplrConnectWalletDialogButton from 'components/Keplr/KeplrConnectWalletDialogButton'

import type { SxProps } from '@mui/material'

interface Props {
  handleClose: () => void
  handleConnect: () => void
  open: boolean
  sx?: SxProps
}

const KeplrConnectWalletDialog: React.FC<Props> = ({
  handleClose,
  handleConnect,
  open,
  sx = {},
}) => {
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogContent>
        <KeplrConnectWalletDialogButton
          onClick={() => handleConnect()}
          subtitle="Connect using Keplr"
          title="Keplr"
          imgSrc={IconKeplr}
        />
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default KeplrConnectWalletDialog
