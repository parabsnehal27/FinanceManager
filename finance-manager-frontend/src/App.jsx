
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import EditTransaction from './pages/EditTransaction'

import ProtectedRoute from './components/ProtectedRoute'

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Default page opens Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route
                        path="/add-transaction"
                        element={<AddTransaction />}
                    />

                    <Route
                        path="/edit-transaction/:id"
                        element={<EditTransaction />}
                    />

                </Route>

                {/* Unknown URL redirects to Login */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>

        </BrowserRouter>
    )
}

export default App
