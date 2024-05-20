"use client"
import React, {useEffect, useState} from 'react'
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";
import {db} from "@/utils/dbConfig";
import {desc, eq} from "drizzle-orm";
import {Expenses} from "@/utils/schema";

function ExpensesDashboard() {

    useEffect(() => {
        getExpensesList()
    }, []);


    const [expenseList, setExpenseList] = useState();

    const getExpensesList = async() => {
        const result = await db.select().from(Expenses)
            .orderBy(desc(Expenses.id));
        setExpenseList(result)
    }
    return (
        <div className={'p-5'}>
            <ExpenseListTable expenseList={expenseList}/>
        </div>
    )
}

export default ExpensesDashboard
