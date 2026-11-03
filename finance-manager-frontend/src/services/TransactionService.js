
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/transaction'

const getDashboardSummary = () => {
  const token = localStorage.getItem('token')

  return axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getRecentTransactions = () => {
  const token = localStorage.getItem('token')

  return axios.get(`${API_URL}/recent`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteTransaction=(id)=>{
    const token=localStorage.getItem('token')

    return axios.delete(`${API_URL}/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

const getAllTransactions = () => {
    const token = localStorage.getItem('token')

    return axios.get(`${API_URL}/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const TransactionService = {
  getDashboardSummary,
  getRecentTransactions,
  deleteTransaction,
  getAllTransactions
}

export default TransactionService
