import * as React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const getHandler = (handlersObj, event) => {
  return handlersObj && handlersObj.hasOwnProperty(event) ? handlersObj[event] : null
}

const MenuBtnLink = ({ link }) => {
  const styles = { my: 1, color: 'white', display: 'block' }

  switch (link.type) {
    case 'anchor':
      return (
        <Button
          aria-label={`go to ${link.text}`}
          component="a"
          href={link.href}
          sx={styles}
          onClick={getHandler(link.handlers, 'click')}
        >
          {link.text}
        </Button>
      )
    case 'router':
      return (
        <Button
          aria-label={`go to ${link.text}`}
          component={Link}
          sx={styles}
          to={link.href}
          onClick={getHandler(link.handlers, 'click')}
        >
          {link.text}
        </Button>
      )
  }
}

export default MenuBtnLink
