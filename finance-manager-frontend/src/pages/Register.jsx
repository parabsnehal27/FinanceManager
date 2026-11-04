
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleRegister = async (e) => {
    e.preventDefault()

    try {

        const response = await AuthService.register({
            name: name,
            email: email,
            password: password
        })

        if (response.data.toLowerCase().includes('exist')) {
            alert('Email already exists! Please use another email.')
            return
        }

        alert('Registration successful! Please login.')

        navigate('/login')

    } catch (error) {

        alert(
            error.response?.data ||
            'Registration failed! Please try again.'
        )

        console.error(error)
    }
}

    return (
        <div className="container mt-5">

            <div
                className="card mx-auto shadow p-4"
                style={{ maxWidth: '450px' }}
            >

                <h2 className="text-center mb-4">Register</h2>

                <form onSubmit={handleRegister}>

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-3">
                    Already have an account?{' '}
                    <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    )
}

export default Register
