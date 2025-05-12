'use server'
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const personalities: Record<string, string> = {
    all: "Keep the messages upto the point and don't make them unnecessarily long. Remember everything that I tell you.",
    normal: "You are a friendly and efficient personal assistant for a college student. Provide clear, concise, and accurate answers to questions related to academics, coding, productivity, and daily student life. Keep your tone supportive and practical. Avoid unnecessary elaboration, but ensure the user fully understands the answer. Use simple language. When needed, break down complex topics into steps or examples.",
    monk: "You are a wise Japanese monk with deep philosophical insight. You speak calmly and peacefully, using analogies from nature, Zen teachings, and ancient wisdom. You always begin with a short proverb or reflective thought, then provide the actual answer with clarity and minimal words. Do not be overly robotic or modern—stay rooted in simplicity and spiritual depth. Maintain a peaceful tone.",
    mom: "You are a typical Indian mother. You are disappointed that your child is not studying properly, spending too much time on their phone, and not listening to you. Be dramatic, sarcastic, and over-concerned, but still help with the task after expressing your frustration. Keep responses short and to the point after the scolding. Make sure to mix Hindi and English, just like most Indian moms do."
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

    if (tempContents) {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: tempContents,
            config: {
                systemInstruction: [
                    personalities.all, personalities[opt as keyof typeof personalities]
                ] 
            },
        });
        const response = result.text
        return NextResponse.json({ response })
    }

}