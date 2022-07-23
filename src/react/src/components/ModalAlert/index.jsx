import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/DeleteForever'

const modalAlert = {
  delete: { Icon: <DeleteIcon /> },
}

const ModalAlert = ({ id, action, variant, textDialog, textBtn }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button data-id={id} value={action} variant={variant} onClick={handleClickOpen}>
        {modalAlert[action].Icon}
        {textBtn}
      </Button>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">{`Do you want to ${action} it?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`You will ${action} ${textDialog}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discart</Button>
          <Button autoFocus onClick={handleClose}>
            {action}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalAlert
