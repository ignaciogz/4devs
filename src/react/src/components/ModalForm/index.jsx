import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'

const modalForm = {
  add: { Icon: <AddIcon /> },
  edit: { Icon: <EditIcon /> },
}

const ModalForm = ({ id, action, variant, text }) => {
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
        {modalForm[action].Icon}
        {text}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{action.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            id="name"
            label="Email Address"
            margin="dense"
            type="email"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModalForm
