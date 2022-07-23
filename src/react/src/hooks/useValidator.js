import { useState } from 'react'

import useUser from './useUser'

const useValidator = () => {
  const [validateResults, setValidateResults] = useState()
  const { checkUserExist } = useUser()

  async function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

    if (email.length < 5)
      return {
        isValid: false,
        text: 'min length 5 characters',
      }

    if (!emailRegex.test(email))
      return {
        isValid: false,
        text: 'invalid email',
      }

    const userExist = await checkUserExist({ email })

    if (userExist)
      return {
        isValid: false,
        text: 'email already exist',
      }

    return {
      isValid: true,
    }
  }

  function checkPassword(password) {
    if (password.length < 5)
      return {
        isValid: false,
        text: 'min length 5 characters',
      }

    return {
      isValid: true,
    }
  }

  function checkAvatar(avatarFile) {
    if (!avatarFile.name)
      return {
        isValid: false,
        text: 'avatar file is required',
      }

    return {
      isValid: true,
    }
  }

  const validate = {
    email: checkEmail,
    password: checkPassword,
    avatar: checkAvatar,
  }

  const validateRegister = async (formData) => {
    let results = {}

    for (const key of formData.keys()) {
      const value = formData.get(key)

      results[key] = validate.hasOwnProperty(key)
        ? await validate[key](value)
        : {
            isValid: true,
          }
    }

    const resultsValues = Object.values(results)
    const isValid = resultsValues.every((elem) => elem.isValid === true)

    setValidateResults(results)

    return {
      results,
      isValid,
    }
  }

  return {
    validateResults,
    validateRegister,
  }
}

export default useValidator
