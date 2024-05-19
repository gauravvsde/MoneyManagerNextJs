import React from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useUser} from "@clerk/nextjs";
import {Budgets, Expenses} from "@/utils/schema";
import {toast} from "sonner";
import {db} from "@/utils/dbConfig";
import moment from "moment/moment";


function AddExpense({budgetId, user, refreshData}) {
  const [name, setName] = React.useState();
  const [amount, setAmount] = React.useState();

  const addNewExpense = async () => {
      const result = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: moment().format('YYYY-MM-DD'),
      }).returning({insertedId: Budgets.id})

      console.log("result", result);
      if(result){
          refreshData();
          toast("New Expense is Added Successfully");
      }

  }


  return (
      <div className='border p-5 rounded-lg'>
        <h2 className='font-bold text-lg'>Add Expense</h2>
        <div className='mt-2'>
          <h2 className='text-black font-medium my-1'>Expense Name</h2>
          <Input placeholder='e.g. Home Decor'
                 onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='mt-2'>
          <h2 className='text-black font-medium my-1'>Expense Amount</h2>
          <Input placeholder='e.g. Home Decor'
                 onChange={(e) => setAmount(e.target.value)}
          />
        </div>
          <Button disabled={!(name && amount)}
          onClick={() => addNewExpense()}
                  className='mt-3 w-full'>Add Expense</Button>
      </div>
  )
}

export default AddExpense
