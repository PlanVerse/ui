import { NextResponse } from "next/server";
import fs from "fs";
import https from "https";

export async function POST(request) {
    try {
        const { url } = await request.json();

        const name = Date.now().toString();
        const imagePath = `public/uploads/${name}.png`;
        const file = fs.createWriteStream(`./${imagePath}`);
        https.get(url, (response) => {
            response.pipe(file);

            file.on("finish", async () => {
                file.close();
                return NextResponse.json({
                    success: 1,
                    file: {
                        url: `http://localhost:3005/${imagePath}`
                    }
                })
            })
        })

    } catch (error) {
        console.error("uploadbyurl", error);
        return NextResponse.json({
            success: 0,
            error: error.message
        })
    }
    
    
}