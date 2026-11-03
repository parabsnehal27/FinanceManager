
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

function BalanceLineChart({ transactions }) {

    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.transactiondate) - new Date(b.transactiondate)
    )

    let balance = 0

    const balanceData = sortedTransactions.map((transaction) => {

        if (transaction.type === 'Income') {
            balance += Number(transaction.amount)
        } else {
            balance -= Number(transaction.amount)
        }

        return {
            date: transaction.transactiondate,
            balance: balance
        }
    })

    return (
        <div className="card shadow p-3">
            <h5 className="text-center">Balance Trend</h5>

            {balanceData.length === 0 ? (
                <p className="text-center text-muted">
                    No transaction data available
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={balanceData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />
                        <YAxis />

                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="balance"
                            name="Balance"
                            stroke="#8884d8"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default BalanceLineChart
