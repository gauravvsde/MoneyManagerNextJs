"use client"
import React, {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {Calendar as CalendarIcon, PenBox} from "lucide-react";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from "emoji-picker-react";
import {Input} from "@/components/ui/input";
import {db} from "@/utils/dbConfig";
import {eq} from "drizzle-orm";
import {Budgets} from "@/utils/schema";
import {toast} from "sonner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

function EditBudget({budgetInfo, refreshData}) {

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon);
        }
    }, [budgetInfo]);


    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiDialog, setOpenEmojiDialog] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [date, setDate] = useState();

    const onUpdateBudget = async() => {

        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            date: date,
            icon: emojiIcon,
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning()

        if(result){
            refreshData()
            toast('Budget updated successfully.')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                <Button className='flex gap-2'> <PenBox/> Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant='outline' size='lg'
                                        className='text-lg'
                                        onClick={() => {
                                            setOpenEmojiDialog(!openEmojiDialog)
                                        }}>{emojiIcon}</Button>
                                <div className='absolute z-20'>
                                    <EmojiPicker open={openEmojiDialog}
                                                 onEmojiClick={(e) => {
                                                     setEmojiIcon(e.emoji)
                                                     setOpenEmojiDialog(false)
                                                 }}/>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-2'>Budget Name</h2>
                                    <Input placeholder='e.g. Home Decor'
                                           defaultValue={budgetInfo?.name}
                                           onChange={(e) => {
                                               setName(e.target.value)
                                           }}/>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-2'>Budget Amount</h2>
                                    <Input placeholder='e.g. 500'
                                           defaultValue={budgetInfo?.amount}
                                           onChange={(e) => {
                                               setAmount(e.target.value)
                                           }}/>
                                </div>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount && date)}
                                onClick={() => onUpdateBudget()}
                                className='mt-5 w-full'>Update</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )


}

export default EditBudget
