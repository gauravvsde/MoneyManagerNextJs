'use client'
import React, {useEffect, useState} from 'react'
import {db} from "@/utils/dbConfig";
import {desc, eq, getTableColumns, sql} from "drizzle-orm";
import {Budgets, Expenses} from "@/utils/schema";
import {useUser} from "@clerk/nextjs";
import BudgetItem from "@/app/(routes)/dashboard/budgets/_components/BudgetItem";
import AddExpense from "@/app/(routes)/dashboard/expenses/_components/AddExpense";
import ExpenseListTable from "@/app/(routes)/dashboard/expenses/_components/ExpenseListTable";
import {Button} from "@/components/ui/button";
import {PenBox, Trash} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import EditBudget from "@/app/(routes)/dashboard/expenses/_components/EditBudget";


function ExpensesScreen({params}) {

    const user = useUser();

    const [budgetInfo, setBudgetInfo] = useState();

    const [expenseList, setExpenseList] = useState();

    const route = useRouter();

    useEffect(() => {
        user && getBudgetInfo()
    }, [user]);

    const getBudgetInfo = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`SUM(CAST(${Expenses.amount} AS INTEGER))`.mapWith(Number),
            totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
            .from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user?.user?.primaryEmailAddress?.emailAddress))
            .where(eq(Budgets.id, params.id))
            .groupBy(Budgets.id)
        setBudgetInfo(result[0])
        await getExpensesList()
    }

    const getExpensesList = async() => {
        const result = await db.select().from(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .orderBy(desc(Expenses.id));
        setExpenseList(result)
    }

    const deleteBudget = async () => {
        // delete expenses
        const deleteExpenses = await db.delete(Expenses)
            .where(eq(Expenses.budgetId, params.id))
            .returning()

        if(deleteExpenses){
            const result = await db.delete(Budgets)
                .where(eq(Budgets.id, params.id))
                .returning();
            console.log("delete budget", result);
        }
        toast("Budget deleted successfully.")
        route.replace('/dashboard/budgets')
    }

    return (
        <div className='p-10'>
        <h2 className='text-2xl font-bold flex justify-between items-center'>
            My Expenses
            <div className='flex gap-2 items-center'>
               <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()}/>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button className='flex gap-2' variant="destructive"><Trash/>Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your current
                                budget along with all expenses.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteBudget()} >Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>


        </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                {budgetInfo ? <BudgetItem budget={budgetInfo}/> :
                    <div className='h=[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
                    </div>
                }
                <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseListTable expenseList={expenseList} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default ExpensesScreen
