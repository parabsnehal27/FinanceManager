
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function ExpensePieChart({ transactions }) {

    // Filter only Expense transactions
    const expenses = transactions.filter(
        (transaction) => transaction.type === 'Expense'
    )

    // Group expenses by category
    const categoryData = Object.values(
        expenses.reduce((result, transaction) => {

            const category = transaction.categoryName

            if (!result[category]) {
                result[category] = {
                    name: category,
                    value: 0
                }
            }

            result[category].value += Number(transaction.amount)

            return result

        }, {})
    )

    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28',
        '#FF8042',
        '#8884D8',
        '#82CA9D'
    ]

    return (

        <div className="card shadow p-3">

            <h5 className="text-center">
                Expenses by Category
            </h5>

            {categoryData.length === 0 ? (

                <p className="text-center text-muted">
                    No expense data available
                </p>

            ) : (

                <ResponsiveContainer width="100%" height={300}>

                    <PieChart>

                        <Pie
                            data={categoryData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >

                            {categoryData.map((entry, index) => (

                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip formatter={(value) => `₹${value}`} />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            )}

        </div>

    )
}

export default ExpensePieChart
