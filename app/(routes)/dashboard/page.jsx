"use client"
import React, {useEffect, useState} from 'react'
import {useUser} from "@clerk/nextjs";
import CardInfo from "@/app/(routes)/dashboard/_components/CardInfo";
import {db} from "@/utils/dbConfig";
import {desc, eq, getTableColumns, sql} from "drizzle-orm";
import {Budgets, Expenses} from "@/utils/schema";
import BarChartDashboard from "@/app/(routes)/dashboard/_components/BarChartDashboard";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";

function Dashboard() {
    const user = useUser()

    const [budgetsList, setBudgetsList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);

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
        getAllExpenses()
    }

    const getAllExpenses = async() => {
        const result = await db.select({
            id: Expenses.id,
            name: Expenses.name,
            amount: Expenses.amount,
            createdAt: Expenses.createdAt,
        }).from(Budgets)
            .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(Expenses.id));

        console.log("all expenses", result);
        setExpenseList(result);

    }

    return (
        <div className={'p-8'}>
            <h2 className={'font-bold text-3xl'}>
                Hi, {user?.user?.fullName}
            </h2>
            <p className={'text-gray-500'}>Here's what happening with your money</p>
            <CardInfo budgetsList={budgetsList}/>

            <div className={'grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'}>
                <div className={'md:col-span-2'}>
                    <BarChartDashboard budgetsList={budgetsList}/>
                    <ExpenseListTable expenseList={expenseList} refreshData={() => budgetList()}/>
                </div>
                <div className={'grid gap-5'}>
                    <h2 className={'font-bold text-lg'}>Latest Budgets</h2>
                    {
                        budgetsList.map((item, index) => (
                            <BudgetItem budget={item} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard
