import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import Cart from '../Cart'
import Icon from '../Icon'
import MenuBtnLink from '../MenuLink/MenuBtnLink'
import MenuTextLink from '../MenuLink/MenuTextLink'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import useUser from '../../hooks/useUser'

import './styles.scss'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const ResponsiveAppBar = () => {
  const { isLogged, handleLogout } = useAuth()
  const { getTotalItems, handleCartIconClick } = useCart()
  const { user, isAdmin } = useUser()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const principalMenuLinks = [
    {
      text: 'Home',
      href: '/',
      type: 'router',
      handlers: {
        click: handleCloseNavMenu,
      },
    },
    {
      text: 'About Us',
      href: '#about-us',
      type: 'anchor',
      handlers: {
        click: handleCloseNavMenu,
      },
    },
    {
      text: 'Chat',
      href: '/chat',
      type: 'router',
      handlers: {
        click: handleCloseNavMenu,
      },
    },
  ]

  const settingsLinks = [
    { text: 'Admin', type: 'router', href: '/cpanel', icon: 'AdminPanelSettingsIcon' },
    { text: 'Orders', type: 'router', href: '/orders', icon: 'ListNumberedIcon' },
    {
      text: 'Logout',
      type: 'anchor',
      href: '/logout',
      icon: 'LogoutIcon',
      handlers: {
        click: handleLogout,
      },
    },
  ]

  return (
    <AppBar className="navbar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Russo One',
              fontSize: '2rem',
              fontWeight: 400,
              letterSpacing: '.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            variant="h6"
          >
            4DEVS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="account of current user"
              color="inherit"
              size="large"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              keepMounted
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              id="menu-appbar"
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handleCloseNavMenu}
            >
              {principalMenuLinks.map((mobileMenuLink, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <MenuTextLink link={mobileMenuLink} />
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Russo One',
              fontSize: '2rem',
              fontWeight: 400,
              letterSpacing: '.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            variant="h5"
          >
            4DEVS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {principalMenuLinks.map((menuLink, index) => (
              <MenuBtnLink key={index} link={menuLink} />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              aria-label="show shopping cart"
              color="inherit"
              size="large"
              onClick={handleCartIconClick}
            >
              <Cart itemsQty={getTotalItems()} />
            </IconButton>
            {user && isLogged ? (
              <Tooltip title="Open settings">
                <IconButton
                  aria-label="open user settings"
                  sx={{ p: 0 }}
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    alt={user.name}
                    src={`${MODE_DEV ? SERVER_DEV : SERVER_PROD}${user.img}`}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton
                aria-label="go to login page"
                color="inherit"
                component={Link}
                size="large"
                to="/login"
              >
                <Icon name="PersonIcon" />
              </IconButton>
            )}

            <Menu
              keepMounted
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              id="menu-appbar"
              open={Boolean(anchorElUser)}
              sx={{ mt: '45px' }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handleCloseUserMenu}
            >
              {isLogged &&
                settingsLinks.map((settingLink, index) => (
                  <Box key={index}>
                    {!isAdmin && settingLink.text === 'Admin' ? (
                      false
                    ) : (
                      <MenuItem onClick={handleCloseUserMenu}>
                        <MenuTextLink link={settingLink} />
                      </MenuItem>
                    )}
                  </Box>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
