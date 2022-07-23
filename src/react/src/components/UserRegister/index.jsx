import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

import Notificator from '../Notificator'
import useAuth from '../../hooks/useAuth'
import useNotificator from '../../hooks/useNotificator'
import useValidator from '../../hooks/useValidator'

import './styles.scss'

const Input = styled('input')({
  display: 'none',
})

const UserRegister = () => {
  const { isLogged, register } = useAuth()
  const navigate = useNavigate()
  const { isOpen, severity, text, closeNotificator, setNotificator } = useNotificator()
  let [emailError, setEmailError] = useState(false)
  let [passwordError, setPasswordError] = useState(false)
  let [avatarError, setAvatarError] = useState(false)
  const { validateResults, validateRegister } = useValidator()

  // ↓ ****** START - AUTH ****** ↓
  useEffect(() => {
    isLogged && navigate('/')
  }, [navigate])
  // ↑ ****** END - AUTH ****** ↑

  const handleSubmit = async (event) => {
    event.preventDefault()
    let formData = new FormData(event.target)

    const validation = await validateRegister(formData)

    if (validation.isValid) {
      setNotificator('info', 'Loading...')
      const success = await register(formData)

      if (success) {
        setNotificator('success', 'Redirected in 5 seconds...')
        setTimeout(() => {
          closeNotificator()
          navigate('/')
        }, 10000)
      } else {
        setNotificator('error', 'Registration failed')
      }
    } else {
      setNotificator('error', 'Check errors')
      setEmailError(!validation.results.email.isValid)
      setPasswordError(!validation.results.password.isValid)
      setAvatarError(!validation.results.avatar.isValid)
    }
  }

  return (
    <Box className="register" component="section">
      <Grid container spacing={0}>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <h1>Create Account</h1>
          <Box
            noValidate
            action="http://localhost:8080/api/auth/register"
            autoComplete="off"
            component="form"
            encType="multipart/form-data"
            method="post"
            role="form"
            sx={{
              '& > :not(style)': { m: 1.2, width: '32ch' },
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              required
              error={emailError}
              helperText={emailError ? validateResults.email.text : null}
              label="Email"
              minLength="5"
              name="email"
              type="email"
              variant="standard"
            />
            <TextField required label="Name" name="name" variant="standard" />
            <TextField
              required
              error={passwordError}
              helperText={passwordError ? validateResults.password.text : null}
              label="Password"
              minLength="5"
              name="password"
              type="password"
              variant="standard"
            />
            <label htmlFor="Avatar">
              <Input
                required
                accept="image/gif, image/png, image/jpeg"
                id="Avatar"
                name="avatar"
                type="file"
              />
              <Button className="formBtn" component="span" variant="contained">
                <PhotoCamera />
                Upload Avatar
              </Button>
              <span className={avatarError ? 'avatarError' : 'avatarNoError'}>Required *</span>
            </label>
            <Button className="formBtn" size="large" type="submit" variant="contained">
              <AppRegistrationIcon />
              SIGN UP
            </Button>
            <Box component="div">
              Have an account? <Link to="/login">Log In</Link>
            </Box>
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

export default UserRegister
