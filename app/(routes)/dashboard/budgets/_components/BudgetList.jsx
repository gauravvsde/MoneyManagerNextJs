"use client"
import React, {useEffect, useState} from 'react'
import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget";
import {db} from "@/utils/dbConfig";
import {desc, eq, getTableColumns, sql, sum} from "drizzle-orm";
import {Budgets, Expenses} from "@/utils/schema";
import {useUser} from "@clerk/nextjs";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";

function BudgetList() {
    const user = useUser();
    const [budgetsList, setBudgetsList] = useState([]);

    useEffect(() => {
        user && budgetList()
    }, [user]);

    const budgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`SUM(CAST(${Expenses.amount} AS INTEGER))`.mapWith(Number),
            totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.user?.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));

        setBudgetsList(result);
    }


    return (
        <div className='mt-7'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <CreateBudget
                    refreshData={() => budgetList()} />
                {
                     budgetsList?.length > 0 ? budgetsList.map((budget, index) => {
                        return <BudgetItem budget={budget} key={index} />
                    })
                         : [1,2,3,4,5,6].map((item, index) => {
                             return <div key={index} className='w-full bg-slate-200 rounded-lg h-[150px] animate-pulse'></div>
                         })
                }
            </div>
        </div>
    )
}

export default BudgetList
