import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await AuthService.login({
  email: email,
  password: password
})

console.log("LOGIN RESPONSE:", response.data)

    const token = response.data

    localStorage.setItem('token', token)

    alert('Login successful!')

    navigate('/dashboard')

  } catch (error) {
    alert('Login failed! Please check your email and password.')
    console.error(error)
  }
}

  return (
    <>
      <div className="container mt-5">
        <div
          className="card mx-auto p-4 shadow"
          style={{ maxWidth: '450px' }}
        >
          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleLogin}>
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="btn btn-primary w-100"
              type="submit"
            >
              Login
            </button>

            {message && (
              <div className="alert alert-success mt-3">
                {message}
              </div>
            )}
          </form>

          <p className="text-center mt-3">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
