import React from 'react'
export default function Navbar(){
    return(
        <>
            <div className='flex items-center justify-between py-5 px-70 bg-white border-b-1 border-b-[#E4E7EB] text-lg'>
                <div className='text-3xl text-[#4F45E4] font-semibold cursor-pointer'>
                    Askify
                </div>
                <div className='flex items-center justify-center gap-5'>
                    <div className='hover:text-[#4F45E4] font-medium px-4 py-2 hover:bg-[#F3F4F6] rounded-md cursor-pointer'>Chat</div>
                    <div className='hover:text-[#4F45E4] font-medium px-4 py-2 hover:bg-[#F3F4F6] rounded-md cursor-pointer'>Notes</div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <div>Acc</div>
                    <div>Sign Out</div>
                </div>
            </div>             
        </>
    )
}
