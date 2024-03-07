import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [details, setDetails] = useState({ load: '', title: '', reps: '' })
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const { user } = useAuthContext()

  const updateForm = e => {
    setDetails(prev => ({ ...prev, [e.name]: e.value }))

    if (!user) {
      setError('You must be logged in')
      return
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
      console.log('New workout added', json)
      setDetails({ load: '', title: '', reps: '' })
      setEmptyFields([])
    }
    console.log(emptyFields)
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Exercise Title: </label>
      <input
        type='text'
        name='title'
        onChange={e => updateForm(e.target)}
        value={details.title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Weight(lbs): </label>
      <input
        type='number'
        name='load'
        onChange={e => updateForm(e.target)}
        value={details.load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps: </label>
      <input
        type='number'
        name='reps'
        onChange={e => updateForm(e.target)}
        value={details.reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm
