'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavbarClient = () => {
    const pathname = usePathname()
    return (
        <div className='flex items-center justify-center gap-5 font-medium'>
            <Link href='/chat' className={`px-4 py-2 rounded-md cursor-pointer ${pathname === '/chat' ? 'text-[#4F45E4] bg-zinc-200/70' : 'hover:bg-[#F3F4F6]'}`}>Chat</Link>
            <Link href='/notes' className={`px-4 py-2 rounded-md cursor-pointer ${pathname === '/notes' ? 'text-[#4F45E4] bg-zinc-200/70' : 'hover:bg-[#F3F4F6]'}`}>Notes</Link>
        </div>
    )
}

export default NavbarClient