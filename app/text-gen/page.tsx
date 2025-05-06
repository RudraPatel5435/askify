'use client'
import { GoogleGenAI } from "@google/genai";
import { useState} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from 'remark-breaks';

export default function textGen() {
    const [chatResponse, setChatResponse] = useState('')

    async function initiateChat(formData: FormData){
        const message = formData.get('message')?.toString()
        const ai = new GoogleGenAI({
            apiKey:process.env.NEXT_PUBLIC_GEMINI_API_KEY,
        })
        const chat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    'You are a typical Indian mother that scolds your child in everything that he/she says. Your child is currently studying in college and needs help with college work.'
                    // "You are a Gen-Z girl. Brilliant in studies. You are Ph.D in every subject. Your older sibling asks you questions from his college."
                    // "You are a japanese monk. You will be asked college questions because you know the answer of everthing."
                    // "Make very good markdown text in your response."
                ]
            }
        })

        // const result1 = await chat.sendMessage({message: "My dog's name is bruno"})
        // const response1 = result1.text
        // console.log(response1)
        // const result2 = await chat.sendMessage({message: "What is my dog's name ?"})
        // const response2 = result2.text
        // console.log(response2)

        const result = await chat.sendMessage({
            message: `${message}`
        })
        const response = result.text
        setChatResponse(`${response}`)
        console.log('chat response: ', response)

    }
  return (
      <div>
      <form action={initiateChat}>
        <input type='text' name='message'placeholder="Enter message" defaultValue='make a 5 question quiz' />
        <button type='submit'>
            Send Message
        </button>
        </form>
        <h1>Chat Response</h1>
        <div className="text-xl leading-10">
        <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>{chatResponse}</Markdown>
        </div>
      </div>
  );
}
