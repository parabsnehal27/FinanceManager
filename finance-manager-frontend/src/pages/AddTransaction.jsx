
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddTransaction() {

  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [transactionDate, setTransactionDate] = useState('')
  const [type, setType] = useState('Expense')
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState('')
  useEffect(() => {

  const fetchCategories = async () => {

    try {

      const token = localStorage.getItem('token')

      const response = await axios.get(
        'http://localhost:8080/api/category',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setCategories(response.data)

    } catch (error) {

      console.error('Error fetching categories:', error)

    }

  }

  fetchCategories()

}, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const token = localStorage.getItem('token')

    const transactionData = {
      title: title,
      amount: amount,
      description: description,
      transactionDate: transactionDate,
      type: type,
      categoryId: categoryId
    }

    try {

      await axios.post(
        'http://localhost:8080/api/transaction',
        transactionData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Transaction added successfully!')

      navigate('/dashboard')

    } catch (error) {

      console.error('Error:', error.response?.data)

      alert('Failed to add transaction!')

    }
  }

  return (

    <div className="container mt-5">

      <div className="card shadow p-4 mx-auto"
        style={{ maxWidth: '500px' }}>

        <h2 className="text-center mb-4">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control mb-3"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />

          <label className="form-label">Type</label>
          <select
            className="form-select mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <label className="form-label">Category</label>

          <select
            className="form-select mb-3"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}

          </select>

          <button type="submit" className="btn btn-success w-100">
            Add Transaction
          </button>

        </form>

      </div>

    </div>
  )
}

export default AddTransaction
