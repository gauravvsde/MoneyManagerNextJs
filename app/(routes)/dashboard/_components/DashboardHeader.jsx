import React from 'react'
import {UserButton} from "@clerk/nextjs";

function DashboardHeader() {
    return (
        <div className='p-5 border-b shadow-sm flex justify-between'>
            <div>

            </div>
            <div>
                <UserButton/>
            </div>
        </div>
    )
}

export default DashboardHeader
