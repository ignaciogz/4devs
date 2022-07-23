import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />
})

const Notificator = ({ isOpen, severity, text, closeNotificator }) => {
  return (
    <Snackbar autoHideDuration={5000} open={isOpen} onClose={closeNotificator}>
      <Alert severity={severity} sx={{ width: '100%' }} onClose={closeNotificator}>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default Notificator
