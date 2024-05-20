'use client'
import React, {useState} from 'react'
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from "emoji-picker-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {db} from "@/utils/dbConfig";
import {Budgets} from "@/utils/schema";
import {toast} from "sonner";
import {useUser} from "@clerk/nextjs";


function CreateBudget({refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState('😀');
    const [openEmojiDialog, setOpenEmojiDialog] = useState(false);

    const [budgetName, setBudgetName] = useState();
    const [budgetAmount, setBudgetAmount] = useState();

    const user = useUser();

    const onCreateBudget = async() => {
        const result = await db.insert(Budgets)
            .values({
                name: budgetName,
                amount: budgetAmount,
                createdBy: user?.user?.primaryEmailAddress?.emailAddress,
                icon: emojiIcon,
            }).returning({insertedId: Budgets.id})

        if(result){
            refreshData();
            toast("New Budget Created Successfully")
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed
            cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
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
                                    <Input placeholder='e.g. Home Decor' onChange={(e) => {setBudgetName(e.target.value)}}/>
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-2'>Budget Amount</h2>
                                    <Input placeholder='e.g. 500' onChange={(e) => {setBudgetAmount(e.target.value)}}/>
                                </div>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(budgetName && budgetAmount)}
                                onClick={() => onCreateBudget()}
                                className='mt-5 w-full'>Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudget
