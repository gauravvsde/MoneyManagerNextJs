import React, {useEffect, useState} from 'react'
import {PiggyBank, ReceiptText, Wallet} from "lucide-react";

function CardInfo({budgetsList}) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        budgetsList && calculateCardInfo();
    }, [budgetsList]);

    const calculateCardInfo = () => {
        let totalBudget_ = 0;
        let totalSpend_ = 0;

        budgetsList.map(budget => {
            totalBudget_ += parseInt(budget.amount);
            totalSpend_ += budget.totalSpend;
        })

        setTotalBudget(totalBudget_);
        setTotalSpend(totalSpend_);
    }

    return (
        <div >
            {budgetsList ? <div className={'mt-7 grid grid-cols-1 md:grid-cols-3 gap-3'}>
            <div className={'p-7 border rounded-lg flex items-center justify-between'}>
                <div>
                    <h2 className={'text-sm'}>Total Budget</h2>
                    <h2 className={'fond-bold text-2xl'}>₹{totalBudget}</h2>
                </div>
                <PiggyBank className={'bg-primary p-3 h-12 w-12 rounded-full text-white'}/>
            </div>
            <div className={'p-7 border rounded-lg flex items-center justify-between'}>
                <div>
                    <h2 className={'text-sm'}>Total Spend</h2>
                    <h2 className={'fond-bold text-2xl'}>₹{totalSpend}</h2>
                </div>
                <ReceiptText className={'bg-primary p-3 h-12 w-12 rounded-full text-white'}/>
            </div>
            <div className={'p-7 border rounded-lg flex items-center justify-between'}>
                <div>
                    <h2 className={'text-sm'}>No. Of Budgets</h2>
                    <h2 className={'fond-bold text-2xl'}>{budgetsList.length}</h2>
                </div>
                <Wallet className={'bg-primary p-3 h-12 w-12 rounded-full text-white'}/>
            </div>
            </div>
                :
                <div className={'mt-7 grid grid-cols-1 md:grid-cols-3 gap-3'}>
                    { [1,2,3].map((item, index) => (
                             <div className={'h-[160px] w-full bg-slate-200 animate-pulse rounded-lg'}>
                            </div>
                ))}
                </div>
            }
        </div>
    )
}

export default CardInfo
