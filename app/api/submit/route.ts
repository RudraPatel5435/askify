'use server'
import { ChatMessage } from "@/app/types";
import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const personalities: Record<string, string> = {
  all: "Keep the messages up to the point...",
  normal: "You are a friendly and efficient personal assistant...",
  monk: "You are now a toxic friend...",
  mom: "You are user's typical Indian mother..."
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const message = formData.get("message")?.toString() || "";
    const opt = formData.get("modeOpt")?.toString() || "normal";
    const file = formData.get("fileUpload");
    const historyRaw = formData.get("chatHistory")?.toString() || "[]";

    let parsedHistory: ChatMessage[] = [];
    try {
      parsedHistory = JSON.parse(historyRaw);
    } catch (err) {
      console.warn("Invalid chatHistory JSON", err);
    }

    const historyContent = parsedHistory.map((item) => ({
      role: item.role==='user' ? 'user': 'model',
      parts: [{ text: item.message }]
    }));

    // Add the current message
    let currentContent;
    if (file && file instanceof File && file.name) {
      const mime = file.type;
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const filePart = {
        inlineData: {
          mimeType: mime,
          data: base64
        }
      };

      currentContent = {
        role: "user",
        parts: [{ text: message }, filePart]
      };
    } else {
      currentContent = {
        role: "user",
        parts: [{ text: message }]
      };
    }

    const fullContents = [...historyContent, currentContent];

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20", // or flash
      contents: fullContents,
      config: {
        systemInstruction: [
          personalities.all,
          personalities[opt as keyof typeof personalities]
        ]
      }
    });

    return NextResponse.json({ response: result.text });

  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Gemini API failed" }, { status: 500 });
  }
}
