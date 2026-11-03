
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import EditTransaction from './pages/EditTransaction'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Finance Manager</h1>} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard ></Dashboard>}></Route>
      
        <Route path="/add-transaction" element={<AddTransaction />}></Route>
      
        <Route path="/edit-transaction/:id" element={<EditTransaction/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
