
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditTransaction() {

    const { id } = useParams()
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [transactionDate, setTransactionDate] = useState('')
    const [type, setType] = useState('')
    const [categoryId, setCategoryId] = useState('')

    const [categories, setCategories] = useState([])

    // Fetch Transaction and Categories
    useEffect(() => {

        const fetchTransaction = async () => {
            try {

                const response = await axios.get(
                    `http://localhost:8080/api/transaction/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const transaction = response.data

                console.log("FULL TRANSACTION:", JSON.stringify(transaction, null, 2))

                console.log("Transaction Data:", transaction)

                setTitle(transaction.title)
                setAmount(transaction.amount)
                setDescription(transaction.description || '')

                // Fetch transaction date
                setTransactionDate(
                    transaction.transactiondate
                        ? transaction.transactiondate.substring(0, 10)
                        : ''
                )

                // Fetch transaction type
                setType(transaction.type || '')

                setCategoryId(
                    transaction.categoty?.categoryId ??
                    transaction.categoty?.id ??
                    transaction.category?.categoryId ??
                    transaction.category?.id ??
                    transaction.categoryId ??
                    ''
                )

            } catch (error) {
                console.error("Error fetching transaction:", error)
                alert("Failed to fetch transaction")
            }
        }

        const fetchCategories = async () => {
            try {

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
                console.error("Error fetching categories:", error)
                alert("Failed to fetch categories")
            }
        }

        fetchTransaction()
        fetchCategories()

    }, [id, token])


    // Update Transaction
    const handleUpdate = async (e) => {

        e.preventDefault()

        const transactionData = {
            title,
            amount,
            description,
            transactionDate,
            type,
            categoryId
        }

        try {

            await axios.put(
                `http://localhost:8080/api/transaction/${id}`,
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Transaction Updated Successfully!")

            navigate('/dashboard')

        } catch (error) {

            console.error("Error updating transaction:", error)

            alert("Failed to update transaction")

        }
    }


    // UI
    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Edit Transaction
                </h2>

                <form onSubmit={handleUpdate}>

                    {/* Title */}
                    <div className="mb-3">

                        <label className="form-label">
                            Title
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                    </div>


                    {/* Amount */}
                    <div className="mb-3">

                        <label className="form-label">
                            Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />

                    </div>


                    {/* Description */}
                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                    </div>


                    {/* Date */}
                    <div className="mb-3">

                        <label className="form-label">
                            Transaction Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={transactionDate}
                            onChange={(e) => setTransactionDate(e.target.value)}
                            required
                        />

                    </div>


                    {/* Type */}
                    <div className="mb-3">

                        <label className="form-label">
                            Transaction Type
                        </label>

                        <select
                            className="form-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >

                            <option value="">
                                Select Type
                            </option>

                            <option value="Income">
                                Income
                            </option>

                            <option value="Expense">
                                Expense
                            </option>

                        </select>

                    </div>


                    {/* Category */}
                    <div className="mb-3">

                        <label className="form-label">
                            Category
                        </label>

                        <select
                            className="form-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (

                                <option
                                    key={category.id}
                                    value={category.id}
                                >

                                    {category.name}

                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Buttons */}
                    <div className="d-flex gap-2">

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Update Transaction
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    )
}

export default EditTransaction
