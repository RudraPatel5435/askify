import React from 'react'
import NavbarClient from './NavbarClient'
export default function Navbar() {
    return (
        <>
            <div className='flex items-center justify-between py-3 px-70 bg-white border-b-1 border-b-[#E4E7EB] text-lg'>
                <div className='text-2xl text-[#4F45E4] font-semibold cursor-pointer'>
                    Askify
                </div>
                <NavbarClient />
                <div className='flex items-center justify-between gap-5'>
                    <div>Acc</div>
                    <div>Sign Out</div>
                </div>
            </div>
        </>
    )
}
