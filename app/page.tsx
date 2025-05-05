'use client'
import { GoogleGenAI } from "@google/genai";
import { useEffect, useState} from "react";

export default function Home() {
    const [chatResponse, setChatResponse] = useState('')

    async function initiateChat(formData: FormData){
        const message = formData.get('message')?.toString()
        const ai = new GoogleGenAI({
            apiKey:"AIzaSyAqqecoNs8yuqI1H6OI7NCuyENf4IApBpk"
        })
        const chat = ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: [
                    // 'You are a typical Indian mother that scolds your child in everything that he/she says. Your child is currently studying in college and needs help with college work.'
                    // "You are a Gen-Z girl. Brilliant in studies. You are Ph.D in every subject. Your older sibling asks you questions from his college."
                    // "You are a japanese monk. You will be asked college questions because you know the answer of everthing."
                ]
            }
        })
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
        <input type='text' name='message'placeholder="Enter message"/>
        <button type='submit'>
            Send Message
        </button>
        </form>
        <h1>Chat Response</h1>
        <p className="text-lg">{chatResponse}</p>
      </div>
  );
}
