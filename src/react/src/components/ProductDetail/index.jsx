import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'

import './styles.scss'

import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'
import useProducts from '../../hooks/useProducts'
import useNotificator from '../../hooks/useNotificator'
import Notificator from '../Notificator'
import useUtilities from '../../hooks/useUtilities'

const MODE_DEV = import.meta.env.VITE_ENV !== 'production'
const SERVER_DEV = import.meta.env.VITE_SERVER_URL_DEV
const SERVER_PROD = import.meta.env.VITE_SERVER_URL_PROD

const ProductDetail = () => {
  const { id } = useParams()
  const { isLogged } = useAuth()
  const { addCartItem, getMaxQtyToAdd } = useCart()
  const { product, getID } = useProducts()
  const navigate = useNavigate()
  const { isOpen, severity, text, closeNotificator, setNotificator } = useNotificator()
  const { formatPrice } = useUtilities()
  const [loader, setLoader] = useState(true)
  const [units, setUnits] = useState(1)
  const [maxQty, setMaxQty] = useState(null)

  async function getProduct(id) {
    const result = await getID(id)

    if (result.success) {
      const max = getMaxQtyToAdd(result.data.product.id, result.data.product.stock)

      setMaxValue(max)

      setLoader(false)
    } else {
      setTimeout(() => {
        navigate('/error404')
      }, 1500)
    }
  }

  useEffect(() => {
    getProduct(id)
  }, [id])

  function setMaxValue(max) {
    max > 0 && setMaxQty(max)
    max == 0 && setMaxQty(false)
  }

  const handleChange = (event) => {
    setUnits(event.target.value)
  }

  const handleClick = async () => {
    if (isLogged) {
      let qty = units

      if (qty > 0) {
        let max = undefined
        const result = await addCartItem(id, qty, false)

        if (result.success) {
          setNotificator('success', 'Units added')

          const result = await getID(id)

          if (result.success) {
            max = getMaxQtyToAdd(product.id, result.data.product.stock)
            max == 0 && setUnits(0)
            max > 0 && setUnits(1)
          }
        } else {
          setNotificator('error', `${result.error.description}`)

          max = getMaxQtyToAdd(product.id, result.error.value)
          max == 0 && setUnits(0)
          max > 0 && setUnits(max)
        }

        setMaxValue(max)
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <Box className="product-details" component="section">
      {loader ? (
        <Box className="loader">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <img src={`${MODE_DEV ? SERVER_DEV : SERVER_PROD}${product.img}`} />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={0}>
              <Grid item xs={5}>
                <h1>{product.name}</h1>
                <Rating readOnly name="read-only" precision={0.5} value={product.rating} />
                <Divider className="divider" />
              </Grid>
              <Grid item xs={12}>
                <Typography className="price">{formatPrice(product.price)}</Typography>
              </Grid>
              <Grid item xs={12}>
                {product.description.length > 0 &&
                  product.description.map((paragraph, index) => (
                    <Typography
                      key={index}
                      className="description"
                      color="text.secondary"
                      variant="body2"
                    >
                      {paragraph}
                    </Typography>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Box className="wrapper-units-to-add" component="div">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="units-to-add"
                    color="warning"
                    id="units-to-add"
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      disabled: maxQty ? false : true,
                      min: maxQty ? '1' : '0',
                      max: maxQty.toString(),
                    }}
                    label="Units to add"
                    type="number"
                    value={maxQty ? units.toString() : '0'}
                    variant="standard"
                    onChange={handleChange}
                  />
                  <Button
                    className="add-to-cart-btn"
                    disabled={maxQty ? false : true}
                    variant="contained"
                    onClick={handleClick}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
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
        </Grid>
      )}
    </Box>
  )
}

export default ProductDetail
