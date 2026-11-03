
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'

function MonthlyBarChart({ transactions }) {

    const monthlyData = Object.values(
        transactions.reduce((result, transaction) => {

            const date = new Date(transaction.transactiondate)
            const month = date.toLocaleString('default', {
                month: 'short'
            })

            if (!result[month]) {
                result[month] = {
                    month: month,
                    Income: 0,
                    Expense: 0
                }
            }

            if (transaction.type === 'Income') {
                result[month].Income += Number(transaction.amount)
            } else {
                result[month].Expense += Number(transaction.amount)
            }

            return result

        }, {})
    )

    return (
        <div className="card shadow p-3">
            <h5 className="text-center">Monthly Income vs Expenses</h5>

            {monthlyData.length === 0 ? (
                <p className="text-center text-muted">
                    No transaction data available
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />
                <YAxis />

                <Tooltip />
                <Legend />

                <Bar dataKey="Income" fill="#28a745" />
                <Bar dataKey="Expense" fill="#dc3545" />

                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}

export default MonthlyBarChart
