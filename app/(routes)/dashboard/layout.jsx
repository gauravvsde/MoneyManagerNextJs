"use client"
import React, {useEffect} from 'react'
import SideNav from "@/app/(routes)/dashboard/_components/SideNav";
import DashboardHeader from "@/app/(routes)/dashboard/_components/DashboardHeader";
import {Budgets} from "@/utils/schema";
import {useUser} from "@clerk/nextjs";
import {eq} from "drizzle-orm";
import {db} from "@/utils/dbConfig";
import {router} from "next/client";

function DashboardLayout({children}) {
    const {user} = useUser();

    useEffect(() => {
        user && checkUserBudgets();
    }, [user]);

    const checkUserBudgets = async () => {
        const result = await db.select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
        console.log(result);

        if(result[0]?.length === 0){
            console.log("hello")
            router.replace('dashboard/budgets')
        }
    }

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav/>
            </div>
            <div className='md:ml-64'>
                <DashboardHeader/>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout
