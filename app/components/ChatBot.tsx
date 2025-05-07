import { GoogleGenAI } from '@google/genai'
import { Angry, Bot, House, Paperclip, Plus, Send } from 'lucide-react'
import React from 'react'
export default function ChatBot() {

    async function handleSend(formData: FormData){
        const message  = formData.get('message')?.toString()
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
        const chat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    "Keep the messages upto the point and don't make them unnecessarily long.",
                    "You are a personal assistant of a college student. Help him/her with their work."
                     //'You are a typical Indian mother that scolds your child in everything that he/she says. Your child is currently studying in college and needs help with college work.'
                     // "You are a Gen-Z girl. Brilliant in studies. You are Ph.D in every subject. Your older sibling asks you questions from his college."
                     // "You are a japanese monk. You will be asked college questions because you know the answer of everthing."
                ]
            }
        })
        const result = await chat.sendMessage({
            message: `${message}`
        })
        const response = result.text
        console.log(response)
    }

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
                    <div className='bg-white border-2 border-borderp px-4 py-3  rounded-lg w-1/3 hover:scale-102 hover:border-[#d1d4d9] hover:drop-shadow-sm hover:drop-shadow-[#d1d4d9] cursor-pointer'>
                        <div className='flex items-center justify-start gap-3'>
                            <div className='p-2 bg-hoverp rounded-full'><Angry /></div>
                            <div className='font-medium'>Indian Mom</div>
                        </div>
                        <div className='mt-2 text-sm text-texts'>Caring, protective, and lovingly critical</div>
                    </div>
                    <div className='bg-white border-2 border-borderp px-4 py-3 rounded-lg w-1/3 hover:scale-102 hover:border-[#d1d4d9] hover:drop-shadow-sm hover:drop-shadow-[#d1d4d9] cursor-pointer'>
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
                <form action={handleSend} className='flex items-center justify-between gap-5 mt-5'>
                    <div className='cursor-pointer hover:bg-[#F3F4F6] p-5 rounded-lg flex items-center justify-center'>
                        <input type='file' id='fileUpload' className='file:hidden' />
                        <label htmlFor='fileUpload'><Paperclip className='cursor-pointer' /></label>
                    </div>

                    <textarea name='message' placeholder='Type your message...' rows={2} className='w-full px-4 py-2 rounded-md border-1 outline-blue-500 border-[#D1D5DA]'>
                    </textarea>
                    <button type='submit' className='text-white bg-[#4F45E4]/70 hover:bg-[#4F45E4] px-4 py-2 rounded-lg'>
                        <Send />
                    </button>
                </form>
            </div>
        </>
    )
}
