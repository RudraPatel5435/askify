'use client'
import { Angry, Bot, House, Paperclip, Send, Trash } from 'lucide-react'
import React from 'react'
export default function ChatBot() {

    return (
        <>
            <div className='px-35 py-5'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold text-3xl'>Study Assistant</div>
                    <div className='flex items-center gap-3 border-2 border-[#4941DA] bg-[#5a53db] hover:bg-[#4941DA] px-4 py-2 rounded-lg text-white'>
                        <Trash size={20} />
                        <span className=''>Clear Chat</span>
                    </div>
                </div>

                <form onSubmit={async(e)=>{
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const res = await fetch('/store/submit', {
                        method: "POST",
                        body: formData,
                    })
                    const response = await res.json()
                    console.log('response:',response)
                }}>
                    <div className='text-lg mt-5 font-medium'>Choose AI Personality</div>
                    <div className='flex items-center justify-between gap-5 mt-3 select-none'>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='normalOpt' value='normal' defaultChecked className='peer hidden' />
                            <label htmlFor='normalOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-2 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Bot /></div>
                                    <div className='font-medium'>Normal</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Helpful, friendly and straightforward</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='momOpt' value='mom' className='peer hidden' />
                            <label htmlFor='momOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-2 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Angry /></div>
                                    <div className='font-medium'>Indian Mom</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Caring, protective, and lovingly critical</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='monkOpt' value='monk' className='peer hidden' />
                            <label htmlFor='monkOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-2 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><House /></div>
                                    <div className='font-medium'>Monk</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Calm, wise, and philosophical</div>
                            </label>
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 bg-[#F3F4F6] h-120 w-full mt-5 mb-10 rounded-lg p-5 font-medium'>
                        <div className='bg-[#DFE7FF] px-4 py-2 rounded-xl w-fit self-end'>
                            You:<br />
                            Hello there!
                        </div>
                        <div className='bg-white px-4 py-2 rounded-xl w-fit'>
                            Normal: <br />
                            I am good how about you ?
                        </div>
                    </div>


                    <hr className='text-[#E4E7EB]' />
                    <div className='flex items-center justify-between gap-5 mt-5'>
                        <div className='cursor-pointer hover:bg-[#F3F4F6] p-5 rounded-lg flex items-center justify-center'>
                            <input type='file' id='fileUpload' name='fileUpload' className='file:hidden' />
                            <label htmlFor='fileUpload'><Paperclip className='cursor-pointer' /></label>
                        </div>

                        <textarea name='message' placeholder='Type your message...' rows={2} className='w-full px-4 py-2 rounded-md border-1 outline-blue-500 border-[#D1D5DA]'>
                        </textarea>
                        <button type='submit' className='text-white bg-[#4F45E4]/70 hover:bg-[#4F45E4] px-4 py-2 rounded-lg'>
                            <Send />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
