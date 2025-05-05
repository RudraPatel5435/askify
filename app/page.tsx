'use client'
import { GoogleGenAI } from "@google/genai";
import { useEffect} from "react";

export default function Home() {

    const ai = new GoogleGenAI({apiKey: "AIzaSyAqqecoNs8yuqI1H6OI7NCuyENf4IApBpk"})

    async function Aiworks(){
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "what is my dog's name ?"
        })
        console.log(response.text)
    }
    useEffect (()=>{
        Aiworks()
    }, [])
  return (
      <div>
      </div>
  );
}
