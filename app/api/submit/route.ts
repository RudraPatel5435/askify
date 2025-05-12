'use server'
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const personalities: Record<string, string> = {
    all: "Keep the messages upto the point and don't make them unnecessarily long.",
    normal: "You are a personal assistant of a college student. Help him/her with their work.",
    monk: "You are a japanese monk. You will be asked college questions because you know the answer of everthing.",
    mom: "You are a typical Indian mother that scolds your child in everything that he/she says. Your child is currently studying in college and needs help with college work."
}

export async function POST(req: Request) {
    const formData = await req.formData()
    const message = formData.get('message')?.toString()
    const opt = formData.get('modeOpt')?.toString()
    const file = formData.get('fileUpload')
    let tempContents

    if ( file && file instanceof File && file.type!=='application/octet-stream') {
        const mime = file.type
        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString('base64')

        const filePart = {
            inlineData: {
                mimeType: mime,
                data: base64
            }
        }

        tempContents = [
            { text: message },
            filePart
        ]
    } else {
        tempContents = message
    }

    if (opt === 'mom' && message && tempContents) {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: tempContents,
            config: {
                systemInstruction: [
                    personalities.all, personalities.mom
                ] 
            },
        });
        const response = result.text
        return NextResponse.json({ response })
    }
    if (opt === 'monk' && message && tempContents) {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: tempContents,
            config: {
                systemInstruction: [
                    personalities.all, personalities.monk
                ] 
            },
        });
        const response = result.text
        return NextResponse.json({ response })
    }
    if (opt === 'normal' && message && tempContents) {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: tempContents,
            config: {
                systemInstruction: [
                    personalities.all, personalities.normal
                ] 
            },
        });
        const response = result.text
        return NextResponse.json({ response })
    }
}
