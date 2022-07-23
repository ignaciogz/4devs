import * as React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'

import Icon from '../../Icon'

const getHandler = (handlersObj, event) => {
  return handlersObj && handlersObj.hasOwnProperty(event) ? handlersObj[event] : null
}

const getIcon = (iconObj) => {
  return iconObj ? <Icon name={iconObj} /> : null
}

const MenuTextLink = ({ link }) => {
  const styles = { my: 1, color: 'black', display: 'flex' }

  switch (link.type) {
    case 'anchor':
      return (
        <Typography
          component="a"
          href={link.href}
          sx={styles}
          textAlign="center"
          onClick={getHandler(link.handlers, 'click')}
        >
          {getIcon(link.icon)}
          {link.text}
        </Typography>
      )
    case 'router':
      return (
        <Typography
          component={Link}
          sx={styles}
          textAlign="center"
          to={link.href}
          onClick={getHandler(link.handlers, 'click')}
        >
          {getIcon(link.icon)}
          {link.text}
        </Typography>
      )
  }
}

export default MenuTextLink
