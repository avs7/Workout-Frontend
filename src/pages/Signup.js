import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [newSignup, setNewSignup] = useState({ email: '', password: '' })
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async e => {
    e.preventDefault()
    await signup(newSignup.email, newSignup.password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Email</label>
      <input
        type='email'
        onChange={e =>
          setNewSignup(prev => ({ ...prev, email: e.target.value }))
        }
        value={newSignup.email}
      />

      <label>Password</label>
      <input
        type='password'
        onChange={e =>
          setNewSignup(prev => ({ ...prev, password: e.target.value }))
        }
        value={newSignup.password}
      />

      <button disabled={isLoading}>Sign Up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
