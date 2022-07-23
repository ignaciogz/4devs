import * as React from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import WpIcon from '@mui/icons-material/WhatsappRounded'

import Newsletter from '../Newsletter'
import SocialNetworks from '../SocialNetworks'
import amex from '../../assets/img/payments/amex.png'
import mastercard from '../../assets/img/payments/mastercard.png'
import visa from '../../assets/img/payments/visa.png'
import datafiscal from '../../assets/img/datafiscal.jpg'
import company from '../../assets/img/company.jpg'

import './styles.scss'

const Footer = () => {
  return (
    <Box className="footer" component="section">
      <Box className="wrapper" component="div">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Newsletter />
          </Grid>
          <Grid item xs={2}>
            <SocialNetworks />
          </Grid>
        </Grid>
        <Divider className="divider" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="about-us" component="div" id="about-us">
              <img alt="Our company" src={company} />
              <Box component="div">
                <p>
                  Our company is the leading designer and manufacturer of ergonomic products that
                  improve the health and comfort of work life.
                </p>
                <p>
                  Our award-winning solutions, including self-adjusting seating, sit/stand desks,
                  monitor arms and task lighting, inspire movement and support the user in every
                  posture.
                </p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={3}>
            <Box className="other-links" component="div">
              <h3>Other Links</h3>
              <ul>
                <li>
                  <a href="/#!">Our guarantees</a>
                </li>
                <li>
                  <a href="/#!">Terms and conditions</a>
                </li>
                <li>
                  <a href="/#!">Privacy policy</a>
                </li>
                <li>
                  <a href="/#!">Site map</a>
                </li>
              </ul>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box className="payments" component="div">
              <img alt="Visa" src={visa} />
              <img alt="Mastercard" src={mastercard} />
              <img alt="American Express" src={amex} />
            </Box>
            <Box className="afip" component="div">
              <img alt="Data Fiscal" src={datafiscal} />
            </Box>
          </Grid>
        </Grid>
        <Divider className="divider" />
        <Box className="end" component="div">
          4DEVS Shop © 2022 All rights reserved
          <Box className="wp" component="div">
            <a href="#!">
              <h5>questions?</h5>
              <Box className="wrapper" component="div">
                <WpIcon />
                1-888-123-456
              </Box>
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
