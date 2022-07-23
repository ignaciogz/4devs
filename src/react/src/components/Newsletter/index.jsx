import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import './styles.scss'

import useNotificator from '../../hooks/useNotificator'
import Notificator from '../Notificator'

const Newsletter = () => {
  const { isOpen, severity, text, closeNotificator, setNotificator } = useNotificator()

  const handleClick = async (event) => {
    event.preventDefault()

    setNotificator('info', 'Not implemented')
  }

  return (
    <Box className="newsletter" component="section">
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Box component="div">
            <h4>Subscribe newsletter</h4>
            <small>Get all the latest information on Events, Sales and Offers</small>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box noValidate autoComplete="off" component="form">
            <TextField required className="text-field" placeholder="Email Address" size="small" />
            <Button variant="contained" onClick={handleClick}>
              SUBMIT
            </Button>
          </Box>
        </Grid>
      </Grid>

      {isOpen && (
        <Notificator
          closeNotificator={closeNotificator}
          isOpen={isOpen}
          severity={severity}
          text={text}
        />
      )}
    </Box>
  )
}

export default Newsletter
