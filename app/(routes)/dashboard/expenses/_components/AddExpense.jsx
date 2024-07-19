"use client"
import React from 'react'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useUser} from "@clerk/nextjs";
import {Budgets, Expenses} from "@/utils/schema";
import {toast} from "sonner";
import {db} from "@/utils/dbConfig";
import moment from "moment/moment";

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


function AddExpense({budgetId, user, refreshData}) {
  const [name, setName] = React.useState();
  const [amount, setAmount] = React.useState();
  const [date, setDate] = React.useState();

  const addNewExpense = async () => {
      const formattedDate = format(date, "yyyy-MM-dd");
      const result = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: formattedDate,
          createdBy: user?.user?.primaryEmailAddress?.emailAddress,
      }).returning({insertedId: Budgets.id})

      setAmount('')
      setName('')
      setDate('')

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
                     value={name}
                     onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div className='mt-2'>
              <h2 className='text-black font-medium my-1'>Expense Amount</h2>
              <Input placeholder='e.g. Home Decor'
                     value={amount}
                     onChange={(e) => setAmount(e.target.value)}
              />
          </div>

          <div className={'mt-2'}>
              <h2 className='text-black font-medium my-1'>Expense Date</h2>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button
                          variant={"outline"}
                          className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                          )}
                      >
                          <CalendarIcon className="mr-2 h-4 w-4"/>
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                      <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                      />
                  </PopoverContent>
              </Popover>

          </div>


          <Button disabled={!(name && amount && date)}
                  onClick={() => addNewExpense()}
                  className='mt-3 w-full'>Add Expense</Button>
      </div>
  )
}

export default AddExpense
