import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TransactionService from '../services/TransactionService'
import ExpensePieChart from './ExpensePieChart'
import MonthlyBarChart from './MonthlyBarChart'
import BalanceLineChart from './BalanceLineChart'

function Dashboard() {

  const navigate = useNavigate()

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  })

  const [transactions, setTransactions] = useState([])
  const [allTransactions, setAllTransactions] = useState([])

  useEffect(() => {

    fetchDashboardData()

  }, [])

  const fetchDashboardData = async () => {

    try {

      const response = await TransactionService.getDashboardSummary()

      setSummary(response.data)

      const recentResponse =
        await TransactionService.getRecentTransactions()

      setTransactions(recentResponse.data)

      const allResponse = await TransactionService.getAllTransactions()
      setAllTransactions(allResponse.data)
    } catch (error) {

      console.error('Error fetching dashboard:', error)

    }

  }

  
const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    'Are you sure you want to delete this transaction?'
  )

  if (!confirmDelete) return

  try {

    await TransactionService.deleteTransaction(id)

    alert('Transaction deleted successfully!')

    fetchDashboardData()

  } catch (error) {

    console.error('Delete error:', error.response?.data)

    alert('Failed to delete transaction!')

  }
}


  const handleLogout = () => {

    localStorage.removeItem('token')

    alert('Logged out successfully!')

    navigate('/login')

  }

  return (

    <div className="container mt-5">

      <h1 className="text-center mb-4">
        Finance Manager Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h4 className="text-success">Total Income</h4>
            <h2>₹ {summary.totalIncome}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h4 className="text-danger">Total Expenses</h4>
            <h2>₹ {summary.totalExpense}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow p-3 text-center">
            <h4 className="text-primary">Current Balance</h4>
            <h2>₹ {summary.balance}</h2>
          </div>
        </div>

      </div>
        <div className="row mt-4">

        <div className="col-md-6">

            <ExpensePieChart transactions={allTransactions} />

        </div>

    </div>
    <div className="row mt-4">
        <div className="col-md-12">
            <MonthlyBarChart transactions={allTransactions} />
        </div>
    </div>
    <div className="row mt-4">
    <div className="col-md-12">
        <BalanceLineChart transactions={allTransactions} />
    </div>
    </div>
      <h3 className="mt-5 mb-3">Recent Transactions</h3>

      <div className="table-responsive">

        <table className="table table-bordered table-striped">

          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>

            {transactions.map((transaction) => (

              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>₹ {transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.transactiondate}</td>
                <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => navigate(`/edit-transaction/${transaction.id}`)}
                >
                Edit
                </button>
                <td>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(transaction.id)}
                >
                    Delete
                </button>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>
        
      <button
        className="btn btn-danger mt-3"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>

  )

}

export default Dashboard
