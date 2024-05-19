import React from 'react'
import BudgetList from "@/app/(routes)/dashboard/budgets/_components/BudgetList";

function Budget() {
    return (
        <div className='p-10'>
            <h2 className='fond-bold text-3xl'>My Budgets</h2>
            <BudgetList/>
        </div>
    )
}

export default Budget
