'use server'
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

export  async function POST(req: Request) {
    const formData = await req.formData()
    const message = formData.get('message')?.toString()
    const opt = formData.get('modeOpt')?.toString()
    // const file = formData.get('fileUpload')
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
        return NextResponse.json({response})
    }
    if(opt==='monk'){
        const result = await monkChat.sendMessage({message: `${message}`})
        const response = result.text
        return NextResponse.json({response})
    }
    if(opt==='normal'){
        const result = await normalChat.sendMessage({message: `${message}`})
        const response = result.text
        return NextResponse.json({response})
    }
    // if(file && file instanceof File){
    //     console.log(file.name)
    // }
}
