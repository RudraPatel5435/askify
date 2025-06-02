import React from 'react'
import NavbarClient from './NavbarClient'
import Link from 'next/link'
export default function Navbar() {
    return (
        <>
            <div className='flex items-center justify-between py-3 px-70 bg-white border-b-1 border-b-[#E4E7EB] text-lg selection:bg-[#8e86ff]'>
                <Link href='/chat' className='text-2xl text-[#4F45E4] font-semibold cursor-pointer'>
                    Askify
                </Link>
                <NavbarClient />
                <div className='flex items-center justify-between gap-5'>
                    <div>Acc</div>
                    <div>Sign Out</div>
                </div>
            </div>
        </>
    )
}
