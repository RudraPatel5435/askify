import React from 'react'
import {
  GoogleGenAI,
  createUserContent,
//   createPartFromText,
} from "@google/genai";
// import fetch from 'node-fetch'
// import fs from 'fs'
// import path from 'path'

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function main() {

    async function underImg(){
    const filePart = "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=";
    //  const response = await fetch(imgUrl)
    // const buffer = await response.buffer()
    //
    // const filePath = path.join(process.cwd(), 'temp-image.png')
    // fs.writeFileSync(filePath, buffer)
    // const filePart = await createPartFromFile(filePath, 'image/png')

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: createUserContent([
                filePart, 'Describe this image',
            ]),
        });
        console.log(response.text);
    }
    underImg()
    return (
        <div>
            
        </div>
    )
}

