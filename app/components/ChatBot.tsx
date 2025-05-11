'use client'
import { Angry, Bot, House, Paperclip, Send, Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ChatHistory } from '../types'
export default function ChatBot() {

    const [chatHistory, setChatHistory] = useState<ChatHistory>([])
    const [userMessage, setUserMessage] = useState<string>('')

    const messageRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const emojis = {
        'mom': <Angry size={20} />,
        'normal': <Bot size={20} />,
        'monk': <House />
    }
    const addChatHistory = (botType: 'mom' | 'monk' | 'normal' | null, botMess: string, userMess: string) => {
        setChatHistory(prev => [
            ...prev,
            {
                role: 'user',
                message: userMess
            },
            {
                role: 'bot',
                mode: botType,
                message: botMess
            },
        ])
        // console.log(chatHistory)
    }


    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserMessage(e.target.value)
        const el = textareaRef.current
        if (el) {
            el.style.height = 'auto'
            const lineHeight = 24
            const maxHeight = lineHeight * 6
            el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
        }
    }

    const scrollToBottom = () => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatHistory])


    return (
        <>
            <div className='px-35 py-5'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold text-2xl'>Study Assistant</div>
                    <div className='flex items-center gap-3 border-2 border-[#4941DA] bg-[#5a53db] hover:bg-[#4941DA] px-4 py-2 rounded-lg text-white cursor-pointer'>
                        <Trash size={20} />
                        <span>Clear Chat</span>
                    </div>
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    if (formData.get('message')) {
                        const perUserMessage = userMessage
                        setUserMessage('')
                        const res = await fetch('/api/submit', {
                            method: "POST",
                            body: formData,
                        })
                        const response = await res.json()
                        const mode = formData.get('modeOpt') as 'mom' | 'monk' | 'normal' | null
                        addChatHistory(mode, response.response, perUserMessage)
                        // console.log('response:', response.response)
                    }
                }}>
                    <div className='text-lg mt-5'>Choose AI Personality</div>
                    <div className='flex items-center justify-between gap-5 mt-3 select-none'>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='normalOpt' value='normal' defaultChecked className='peer hidden' />
                            <label htmlFor='normalOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-1 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Bot /></div>
                                    <div className='font-medium'>Normal (Default)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Helpful, friendly and straightforward</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='momOpt' value='mom' className='peer hidden' />
                            <label htmlFor='momOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-1 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Angry /></div>
                                    <div className='font-medium'>Indian Mom (For Fun)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Caring, protective, and lovingly critical</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='monkOpt' value='monk' className='peer hidden' />
                            <label htmlFor='monkOpt' className='peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-2 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><House /></div>
                                    <div className='font-medium'>Monk (For Fun)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Calm, wise, and philosophical</div>
                            </label>
                        </div>
                    </div>


                    <div className='messageDiv flex flex-col gap-3 bg-[#F3F4F6] h-140 w-full mt-5 mb-5 rounded-lg p-5 font-medium overflow-y-scroll'>
                        {
                            chatHistory.map((blob, idx) => (
                                // <div key={idx} className={blob.role==='user'? 'bg-[#DFE7FF] px-4 py-2 rounded-xl w-fit self-end max-w-5/6': 'bg-white px-4 py-2 rounded-xl w-fit max-w-5/6'}>
                                //     {blob.role==='user'?'You': blob.mode}<br />
                                //     {blob.message}
                                // </div>
                                <div key={idx} className={blob.role === 'user' ? 'flex gap-3 items-center bg-[#DFE7FF] px-4 py-2 rounded-xl w-fit self-end max-w-5/6' : 'flex items-center gap-3 bg-white px-4 py-2 rounded-xl w-fit max-w-5/6'}>
                                    <div className={`p-2 rounded-full ${blob.role === 'user' ? 'hidden' : 'bg-[#E4E7EB]'}`}>
                                        {blob.role !== 'user' && blob.mode && emojis[blob.mode as keyof typeof emojis]}
                                    </div>
                                    <div className=''>{blob.message}</div>
                                </div>
                            ))
                        }
                        <div ref={messageRef} />
                    </div>


                    <hr className='text-[#E4E7EB]' />
                    <div className='flex items-center justify-between gap-5 mt-5'>
                        <div className='cursor-pointer hover:bg-[#F3F4F6] p-5 rounded-lg flex items-center justify-center'>
                            <input type='file' id='fileUpload' name='fileUpload' className='file:hidden' />
                            <label htmlFor='fileUpload'><Paperclip className='cursor-pointer' /></label>
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={userMessage}
                            onChange={handleInput}
                            name='message'
                            placeholder='Type your message...'
                            rows={1}
                            className='w-full px-4 py-2 rounded-md border border-[#D1D5DA] outline-[#4941DA] resize-none overflow-scroll leading-6'
                        ></textarea>
                        <button type='submit' className={`${userMessage ? 'cursor-pointer bg-[#4F45E4]' : 'cursor-no-drop bg-[#4F45E4]/70'} text-white px-4 py-2 rounded-lg`}>
                            <Send />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
