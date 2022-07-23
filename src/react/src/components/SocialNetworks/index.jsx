import * as React from 'react'
import Box from '@mui/material/Box'
import FacebookIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import './styles.scss'

const SocialNetwork = () => {
  return (
    <Box className="social-networks" component="section">
      <a href="https://facebook.com/" rel="noreferrer" target="_blank">
        <FacebookIcon fontSize="large" />
      </a>
      <a href="https://twitter.com/" rel="noreferrer" target="_blank">
        <TwitterIcon fontSize="large" />
      </a>
      <a href="https://instagram.com/" rel="noreferrer" target="_blank">
        <InstagramIcon fontSize="large" />
      </a>
    </Box>
  )
}

export default SocialNetwork
