import { GoogleGenAI } from '@google/genai'
import { Angry, Bot, House, Paperclip, Send, Trash } from 'lucide-react'
import React from 'react'
export default function ChatBot() {

    async function handleSend(formData: FormData) {
        'use server'
        const message = formData.get('message')?.toString()
        const opt = formData.get('modeOpt')?.toString()
        const file = formData.get('fileUpload')
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
        const normalChat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    "Keep the messages upto the point and don't make them unnecessarily long.",
                    "You are a personal assistant of a college student. Help him/her with their work.",
                ]
            }
        })
        const momChat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    "Keep the messages upto the point and don't make them unnecessarily long.",
                    "You are a typical Indian mother that scolds your child in everything that he/she says. Your child is currently studying in college and needs help with college work.",
                ]
            }
        })
        const monkChat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    "Keep the messages upto the point and don't make them unnecessarily long.",
                    "You are a japanese monk. You will be asked college questions because you know the answer of everthing."
                ]
            }
        })
        if(opt==='mom'){
            const result = await momChat.sendMessage({message: `${message}`})
            const response = result.text
            console.log(response)
        }
        if(opt==='monk'){
            const result = await monkChat.sendMessage({message: `${message}`})
            const response = result.text
            console.log(response)
        }
        if(opt==='normal'){
            const result = await normalChat.sendMessage({message: `${message}`})
            const response = result.text
            console.log(response)
        }
        if(file && file instanceof File){
            console.log(file.name)
        }
    }

    return (
        <>
            <div className='px-35 py-5'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold text-3xl'>Study Assistant</div>
                    <div className='flex items-center gap-3 border-2 border-[#D1D5DA] hover:bg-hoverp px-4 py-2 rounded-lg'>
                        <Trash size={20} />
                        <span className=''>Clear Chat</span>
                    </div>
                </div>

                <form action={handleSend}>
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
