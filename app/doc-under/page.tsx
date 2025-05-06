import React from 'react';
import path from 'path';
import {readFile} from 'fs/promises';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function docUnder(){
    async function main() {
        const pdfPath = path.join(process.cwd(), 'public', 'pdf.pdf')
        const pdfBuffer = await readFile(pdfPath)
        // const pdfResp = await fetch('https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf')
        //     .then((response) => response.arrayBuffer());

        const contents = [
            { text: "Summarize this document" },
            {
                inlineData: {
                    mimeType: 'application/pdf',
                    data: pdfBuffer.toString("base64")
                }
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: contents
        });
        console.log(response.text);
    }

    main();
    return (
        <div>
            
        </div>
    )
}
