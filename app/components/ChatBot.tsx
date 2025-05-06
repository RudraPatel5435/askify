import { Angry, Bot, House, Paperclip, Plus, Send } from 'lucide-react'
import React from 'react'
export default function ChatBot() {
    return (
        <>
            <div className='px-20 py-5'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold text-3xl'>Study Assistant</div>
                    <div className='flex items-center gap-3 border-2 border-[#D1D5DA] hover:bg-hoverp px-4 py-2 rounded-lg'>
                        <Plus size={20} />
                        <span className=''>New Chat</span>
                    </div>
                </div>
                <div className='text-lg mt-5 font-medium'>Choose AI Personality</div>
                <div className='flex items-center justify-between gap-5 mt-3'>
                    <div className='bg-white border-2 border-borderp px-4 py-3 rounded-lg w-1/3 hover:scale-102 hover:border-[#d1d4d9] hover:drop-shadow-sm hover:drop-shadow-[#d1d4d9] cursor-pointer'>
                        <div className='flex items-center justify-start gap-3'>
                            <div className='p-2 bg-hoverp rounded-full'><Bot /></div>
                            <div className='font-medium'>Normal</div>
                        </div>
                        <div className='mt-2 text-sm text-texts'>Helpful, friendly and straightforward</div>
                    </div>
                    <div className='bg-white border-2 border-borderp px-4 py-3  rounded-lg w-1/3 hover:scale-102 hover:border-[#d1d4d9] hover:drop-shadow-sm hover:drop-shadow-[#d1d4d9]'>
                        <div className='flex items-center justify-start gap-3'>
                            <div className='p-2 bg-hoverp rounded-full'><Angry /></div>
                            <div className='font-medium'>Indian Mom</div>
                        </div>
                        <div className='mt-2 text-sm text-texts'>Caring, protective, and lovingly critical</div>
                    </div>
                    <div className='bg-white border-2 border-borderp px-4 py-3 rounded-lg w-1/3 hover:scale-102 hover:border-[#d1d4d9] hover:drop-shadow-sm hover:drop-shadow-[#d1d4d9]'>
                        <div className='flex items-center justify-start gap-3'>
                            <div className='p-2 bg-hoverp rounded-full'><House /></div>
                            <div className='font-medium'>Monk</div>
                        </div>
                        <div className='mt-2 text-sm text-texts'>Calm, wise, and philosophical</div>
                    </div>
                </div>
                <div className='bg-[#F3F4F6] h-120 w-full mt-5 mb-10 rounded-lg'>

                </div>
                <hr className='text-[#E4E7EB]' />
                <form action='/' className='flex items-center justify-between gap-5 mt-5'>
                    <div className='cursor-pointer hover:bg-[#F3F4F6] p-5 rounded-lg flex items-center justify-center'>
                        <input type='file' id='fileUpload' className='file:hidden' />
                        <label htmlFor='fileUpload'><Paperclip className='cursor-pointer' /></label>
                        
                    </div>
                    <textarea placeholder='Type your message...' rows={2} className='w-full px-4 py-2 rounded-md border-1 outline-blue-500 border-[#D1D5DA]'>
                    </textarea>
                    <div className='text-white bg-[#4F45E4]/70 hover:bg-[#4F45E4] px-4 py-2 rounded-lg'>
                        <Send />
                    </div>
                </form>
            </div>
        </>
    )
}
