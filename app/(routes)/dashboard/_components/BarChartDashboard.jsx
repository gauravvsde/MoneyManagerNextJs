import React from 'react'
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";

function BarChartDashboard({budgetsList}) {
    return (
        <div className={'border rounded-lg p-5'}>
            <h2 className={'font-bold text-lg mb-5'}>Activity</h2>
            <BarChart
                width={600}
                height={300}
                data={budgetsList}
                margin={{
                    top: 7,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
                <Legend/>
                <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
                <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
            </BarChart>
        </div>
    )
}

export default BarChartDashboard
