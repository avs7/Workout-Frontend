import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [newLogin, setNewLogin] = useState({ email: '', password: '' })
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async e => {
    e.preventDefault()
    await login(newLogin.email, newLogin.password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email</label>
      <input
        type='email'
        onChange={e =>
          setNewLogin(prev => ({ ...prev, email: e.target.value }))
        }
        value={newLogin.email}
      />

      <label>Password</label>
      <input
        type='password'
        onChange={e =>
          setNewLogin(prev => ({ ...prev, password: e.target.value }))
        }
        value={newLogin.password}
      />

      <button disabled={isLoading}>Log in</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
