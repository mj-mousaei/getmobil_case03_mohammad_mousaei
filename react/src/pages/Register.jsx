import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'


const Register = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [nameErrText, setNameErrText] = useState('')
  const [emailErrText, setEmailErrText] = useState('')
  const [passwordErrText, setPasswordErrText] = useState('')
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setNameErrText('')
    setEmailErrText('')
    setPasswordErrText('')
    setConfirmPasswordErrText('')

    const data = new FormData(e.target)
    const name = data.get('name').trim()
    const email = data.get('email').trim()
    const password = data.get('password').trim()
    const password_confirmation = data.get('password_confirmation').trim()

    let err = false

    if (name === '') {
      err = true
      setNameErrText('Please fill this field')
    }
    if (email === '') {
      err = true
      setEmailErrText('Please fill this field')
    }
    if (password === '') {
      err = true
      setPasswordErrText('Please fill this field')
    }
    if (password_confirmation === '') {
      err = true
      setConfirmPasswordErrText('Please fill this field')
    }
    if (password !== password_confirmation) {
      err = true
      setConfirmPasswordErrText('Confirm password not match')
    }

    if (err) return

    setLoading(true)

    try {
      const res = await authApi.register({
        name, email, password, password_confirmation
      })
      setLoading(false)
      console.log(res.data)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('id', res.data.user.id)
      navigate('/board')
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      <Box
        component='form'
        sx={{ mt: 1 }}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          name='name'
          disabled={loading}
          error={nameErrText !== ''}
          helperText={nameErrText}
        />
                <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          name='email'
          disabled={loading}
          error={emailErrText !== ''}
          helperText={emailErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password_confirmation'
          label='Confirm Password'
          name='password_confirmation'
          type='password'
          disabled={loading}
          error={confirmPasswordErrText !== ''}
          helperText={confirmPasswordErrText}
        />
        <Button
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={loading}
        >
          Register
        </Button>
      </Box>
      <Button
        component={Link}
        to='/login'
        sx={{ textTransform: 'none' }}
      >
        Already have an account? Login
      </Button>
    </>
  )
}

export default Register