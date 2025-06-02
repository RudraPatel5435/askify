'use client'
import { Angry, Bot, House, Paperclip, Send, Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { ChatHistory } from '../types'
import MarkdownPreview from "@uiw/react-markdown-preview"
export default function ChatBot() {

    const [loading, setLoading] = useState<boolean>(false)
    const [chatHistory, setChatHistory] = useState<ChatHistory>([])
    const [userMessage, setUserMessage] = useState<string>('')
    const [uploadedFile, setUploadedFile] = useState<string>('')

    const messageRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const emojis = {
        'mom': <Angry size={20} strokeWidth={2.5} />,
        'normal': <Bot size={20} strokeWidth={2.5} />,
        'monk': <House strokeWidth={2.5} />
    }
    const addChatHistory = (botType: 'mom' | 'monk' | 'normal' | null, botMess: string, userMess: string, file?: FormDataEntryValue) => {
        setChatHistory(prev => [
            ...prev,
            {
                role: 'user',
                message: userMess,
                file: file
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
        setUserMessage(e.target.value.trimStart())
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
            <div className='px-35 py-5 selection:bg-[#8e86ff]'>
                <div className='flex items-center justify-between'>
                    <div className='font-semibold text-2xl'>Study Assistant</div>
                    <button onClick={() => setChatHistory([])} className='flex items-center gap-3 border-2 border-[#4941DA] bg-[#5046E5] hover:bg-[#4941DA] px-4 py-2 rounded-lg text-white cursor-pointer select-none'>
                        <Trash size={20} />
                        <span>Clear Chat</span>
                    </button>
                </div>

                <form onSubmit={async (e) => {
                    e.preventDefault()
                    if (loading) return
                    const formData = new FormData(e.currentTarget)
                    if (formData.get('message')) {
                        setLoading(true)
                        const perUserMessage = userMessage
                        setUserMessage('')
                        setUploadedFile('')
                        formData.append('chatHistory', JSON.stringify(chatHistory))
                        console.log(chatHistory)
                        const res = await fetch('/api/submit', {
                            method: "POST",
                            body: formData
                        })
                        const response = await res.json()
                        const mode = formData.get('modeOpt') as 'mom' | 'monk' | 'normal' | null
                        const newFile = formData.get('fileUpload')
                        if (newFile) addChatHistory(mode, response.response, perUserMessage, newFile)
                        else addChatHistory(mode, response.response, perUserMessage)

                        // console.log(response.response)
                        setLoading(false)
                    }
                }}>

                    <div className='text-lg mt-5'>Choose AI Personality</div>
                    <div className='flex items-center justify-between gap-5 mt-3 select-none'>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='normalOpt' value='normal' defaultChecked className='peer hidden' />
                            <label htmlFor='normalOpt' className='transform transition-transform duration-200 peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-1 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Bot /></div>
                                    <div className='font-medium'>Normal (Default)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Helpful, friendly and straightforward</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='momOpt' value='mom' className='peer hidden' />
                            <label htmlFor='momOpt' className='transform transition-transform duration-200 peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-1 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><Angry /></div>
                                    <div className='font-medium'>Indian Mom (For Fun)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Caring, protective, and lovingly critical</div>
                            </label>
                        </div>
                        <div className='w-1/3 flex'>
                            <input type='radio' name='modeOpt' id='monkOpt' value='monk' className='peer hidden' />
                            <label htmlFor='monkOpt' className='transform transition-transform duration-200 peer-checked:text-[#4F45E4] peer-checked:scale-103 peer-checked:border-[#4F45E4] peer-checked:bg-[#EEF2FF] bg-white border-1 border-borderp px-4 py-3 rounded-lg w-full hover:scale-103 cursor-pointer'>
                                <div className='flex items-center justify-start gap-3'>
                                    <div className='p-2 bg-white rounded-full'><House /></div>
                                    <div className='font-medium'>Friend (For Fun)</div>
                                </div>
                                <div className='mt-2 text-sm text-texts'>Calm, wise, and philosophical</div>
                            </label>
                        </div>
                    </div>

                    {
                        chatHistory.length === 0 ? (
                            <div className='bg-[#F3F4F6] h-140 w-full mt-5 mb-5 rounded-lg flex items-center justify-center flex-col gap-3'>
                                <div className='font-medium text-3xl'>
                                    Start a conversation
                                </div>
                                <div className='text-md text-[#4B5563] text-center'>
                                    Ask me anything about your engineering studies, upload<br /> documents, or get help with notes.
                                </div>
                            </div>
                        )
                            :
                            (
                                <div className='messageDiv flex flex-col gap-3 bg-[#F3F4F6] h-140 w-full mt-5 mb-5 rounded-lg p-5 overflow-y-scroll'>
                                    {
                                        chatHistory.map((blob, idx) => (
                                            <div key={idx} className={blob.role === 'user' ? 'flex gap-3 items-center bg-[#DFE7FF] px-4 py-2 rounded-xl w-fit self-end max-w-5/6' : 'flex items-start gap-3 bg-white p-4 rounded-xl w-fit max-w-5/6'}>
                                                <div className={`py-2 px-3 rounded-full flex items-center gap-2 select-none ${blob.role === 'user' ? 'hidden' : 'bg-[#E4E7EB] font-medium'} ${blob.mode === 'mom' ? 'text-red-500' : blob.mode === 'monk' ? 'text-blue-500' : 'text-black'}`}>
                                                    <div>{blob.role !== 'user' && blob.mode && emojis[blob.mode as keyof typeof emojis]}</div>
                                                    <div>{blob.role !== 'user' && blob.mode && (blob.mode.charAt(0).toUpperCase() + blob.mode.slice(1))}</div>
                                                </div>
                                                <MarkdownPreview style={{ backgroundColor: 'transparent', color: 'black' }} source={blob.message} />
                                            </div>
                                        ))
                                    }
                                    {loading && (
                                        <div className='flex items-start gap-3 bg-white p-4 rounded-xl w-fit max-w-5/6 animate-pulse'>
                                            <div className='py-2 px-3 rounded-full flex items-center gap-2 bg-[#E4E7EB] font-medium text-black'>
                                                <Bot size={20} strokeWidth={2.5} />
                                                <div>Bot</div>
                                            </div>
                                            <div className='text-gray-500 italic'>Typing...</div>
                                        </div>
                                    )}
                                    <div ref={messageRef} />
                                </div>
                            )
                    }

                    <hr className='text-[#E4E7EB]' />
                    <div className='flex items-center justify-between gap-5 mt-5'>
                        <div>
                            <input
                                type='file'
                                id='fileUpload'
                                name='fileUpload'
                                className='hidden'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = e.target.files?.[0]
                                    if (file) {
                                        setUploadedFile(file.name)
                                        // console.log(file)
                                    } else {
                                        setUploadedFile('')
                                    }
                                }}
                            />
                            <label htmlFor='fileUpload' className={`${uploadedFile.length !== 0 ? 'bg-[#4941DA] text-white' : 'hover:bg-[#F3F4F6]'} cursor-pointer p-5 rounded-lg flex items-center justify-center`}>
                                <Paperclip strokeWidth={2.5} className='cursor-pointer' />
                            </label>
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <div className={`${uploadedFile.length !== 0 ? 'px-2 py-1 rounded-md bg-zinc-200 w-fit ' : 'hidden'}`}>
                                {uploadedFile}
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={userMessage}
                                onChange={handleInput}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault()
                                        e.currentTarget.form?.requestSubmit()
                                    }
                                }}
                                name='message'
                                placeholder={loading ? 'Waiting for response...' : 'Type you message...'}
                                // disabled={loading}
                                rows={1}
                                className='w-full px-4 py-2 rounded-md border border-[#D1D5DA] outline-[#4941DA] resize-none overflow-scroll leading-6'
                            ></textarea>
                        </div>
                        <button type='submit' disabled={loading || !userMessage} className={`${userMessage && !loading ? 'cursor-pointer bg-[#4F45E4]' : 'cursor-not-allowed bg-[#4F45E4]/70'} text-white p-4 rounded-lg`}>
                            <Send />
                        </button>
                    </div>
                </form >
            </div >
        </>
    )
}

