"use client"
import React, {useEffect, useState} from 'react'
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";
import {db} from "@/utils/dbConfig";
import {desc, eq} from "drizzle-orm";
import {Expenses} from "@/utils/schema";

function ExpensesDashboard() {
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [expenseList, setExpenseList] = useState();


    const handleMonthChange = (event) => {
        const month = parseInt(event.target.value);
        setSelectedMonth(month);
        filterExpensesByMonth(month);
    };

    const filterExpensesByMonth = (month) => {
        const filtered = expenseList.filter(expense => {
            const expenseMonth = new Date(expense.createdAt).getMonth() + 1; // getMonth() returns 0-11, add 1 to match month number
            return expenseMonth === month;
        });
        setFilteredExpenses(filtered);
        setExpenseList(filtered)
    };

    useEffect(() => {
        getExpensesList()
    }, [selectedMonth]);


    const getExpensesList = async() => {
        const result = await db.select().from(Expenses)
            .orderBy(desc(Expenses.id));
        setExpenseList(result)
    }
    return (
        <div className={'p-5'}>
            <div className={'mb-10'}>
                <h2 className='font-bold text-lg'>Filter By Month</h2>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">Select a month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            {selectedMonth !== "" ? <ExpenseListTable expenseList={filteredExpenses} refreshData={() => getExpensesList()}/>
                :<ExpenseListTable expenseList={expenseList} refreshData={() => getExpensesList()}/> }
        </div>
    )
}

export default ExpensesDashboard
