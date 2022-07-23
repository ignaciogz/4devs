import { denormalize } from 'normalizr'

const useUtilities = () => {
  const filter = (array, key, value) => array.filter((element) => element[key] == value)

  const formatPrice = (price, withDecimals = true) => {
    let config = {
      style: 'currency',
      currency: 'USD',
    }

    if (!withDecimals) {
      config = {
        ...config,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    }

    const formatter = new Intl.NumberFormat('en-US', config)

    return formatter.format(price)
  }

  const getIconButtonTarget = (target) => {
    if (target.tagName == 'svg') target = target.parentNode
    if (target.tagName == 'path') target = target.parentNode.parentNode

    return target
  }

  const getDenormalizeData = (data, schema, id) => {
    const desnormalizeResult = denormalize(data[id].result, schema, data[id].entities)

    return desnormalizeResult[id]
  }

  return {
    filter,
    formatPrice,
    getDenormalizeData,
    getIconButtonTarget,
  }
}

export default useUtilities
