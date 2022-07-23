import * as React from 'react'
import Box from '@mui/material/Box'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import LogoutIcon from '@mui/icons-material/LogoutRounded'
import PersonIcon from '@mui/icons-material/PersonOutline'

const iconStorage = {
  AdminPanelSettingsIcon: AdminPanelSettingsIcon,
  ListNumberedIcon: ListNumberedIcon,
  LogoutIcon: LogoutIcon,
  PersonIcon: PersonIcon,
}

const Icon = ({ name }) => {
  return <Box component={iconStorage[name]} />
}

export default Icon
