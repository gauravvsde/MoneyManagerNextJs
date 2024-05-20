import React, {useEffect} from 'react'
import Link from "next/link";

function BudgetItem({budget}) {

    const calculateProgressPercentage = () => {
        const percentage=(budget.totalSpend/parseInt(budget.amount,10)) * 100;
        return percentage.toFixed(2);
    }

    return (
        <Link href={'/dashboard/expenses/' + budget.id}>
            <div className='p-5 border-2 rounded-lg hover:shadow-md cursor-pointer h-[150px]'>
            <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 bg-slate-100 rounded-full'>{budget.icon}</h2>
            <div>
                <h2 className='font-bold'>{budget.name}</h2>
                <h2 className='text-sm'>{budget.totalItem} Item</h2>
            </div>
        </div>
           <h2 className='font-bold text-primary text-lg'>₹{budget.amount}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-300'>
                        ₹{budget.totalSpend ? budget.totalSpend : 0} Spent
                    </h2>
                    <h2 className='text-xs text-slate-300'>
                        ₹{budget.amount - budget.totalSpend } Remaining
                    </h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className='bg-primary h-2 rounded-full' style={{width:`${calculateProgressPercentage()}%`}}>

                    </div>
                </div>
            </div>
            </div>
        </Link>
    )
}

export default BudgetItem
