import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import PageviewIcon from '@mui/icons-material/Pageview'
import LogoutIcon from '@mui/icons-material/LogoutRounded'
import ListNumberedIcon from '@mui/icons-material/FormatListNumbered'

import AdminPanelDetails from '../AdminPanelDetails'
import AdminPanelOrders from '../AdminPanelOrders'
import useAuth from '../../hooks/useAuth'

import './styles.scss'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

const group1 = [
  { text: 'Products', icon: InventoryOutlinedIcon },
  { text: 'Categories', icon: CategoryIcon },
  { text: 'Users', icon: PeopleIcon },
  { text: 'Orders', icon: ListNumberedIcon },
]

const group2 = [
  { text: 'View shop', icon: PageviewIcon },
  { text: 'Logout', icon: LogoutIcon },
]

const AdminPanel = () => {
  const theme = useTheme()
  const [page, setPage] = useState('Products')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthAdmin, handleLogout } = useAuth()
  const [loader, setLoader] = useState(true)

  // ↓ ****** START - AUTH ****** ↓
  useEffect(() => {
    !isAuthAdmin && navigate('/')

    setLoader(false)
  }, [])
  // ↑ ****** END - AUTH ****** ↑

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handlePageButtonClick = (pageName) => {
    return () => setPage(pageName)
  }

  const handleLogoutClick = async (event) => {
    await handleLogout(event)
    navigate('/')
  }

  return (
    <Box className="admin-panel" sx={{ display: 'flex' }}>
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CssBaseline />
          <AppBar className="navbar" open={open} position="fixed">
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                color="inherit"
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
              <Typography noWrap component="div" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                ADMIN PANEL
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={open} variant="permanent">
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {group1.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={handlePageButtonClick(item.text)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {<item.icon />}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List className="final-list-group">
              {group2.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  {item.text !== 'Logout' ? (
                    <ListItemButton
                      component={Link}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      to="/"
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {<item.icon />}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      onClick={handleLogoutClick}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {<item.icon />}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {page === 'Order' ? <AdminPanelOrders /> : <AdminPanelDetails page={page} />}
          </Box>
        </>
      )}
    </Box>
  )
}

export default AdminPanel
