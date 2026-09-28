import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

function isValidHex(color: unknown): color is string {
    return (
        typeof color === "string" &&
        /^#[0-9A-Fa-f]{6}$/.test(color)
    );
}

const paletteSchema = {
    type: "object",
    properties: {
        palette: {
            type: "array",
            items: {
                type: "string",
                pattern: "^#[0-9A-Fa-f]{6}$",
            },
            minItems: 6,
            maxItems: 6,
        },

        description: {
            type: "string",
        },
    },

    required: ["palette", "description"],
};

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Please provide a palette description." },
                { status: 400 }
            );
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: `
                Create a 6-color color palette based on this description:

                "${prompt}"

                Requirements:

                1. Generate exactly 6 visually harmonious colors.
                2. Every color must be a valid 6-digit HEX color.
                3. Return only the HEX color for each palette item.
                4. Do not include descriptions, labels, or additional text
                inside the palette items.
                5. Write a meaningful description of the generated palette.
                6. The description must explain the palette's color mood,
                visual inspiration, and how the colors work together.
                7. The description must be specific to the colors you generated.
                8. Do not use generic responses such as "test", "nice palette",
                "beautiful colors", or "this is a color palette".
                9. Keep the description between 2 and 3 sentences.
                10. Do not include HEX codes in the description.
            `,

            config: {
                responseMimeType: "application/json",
                responseJsonSchema: paletteSchema,
            },
        });

        const output = response.text;

        if (!output) {
            throw new Error("Gemini returned an empty response.");
        }

        const result = JSON.parse(output);
        const rawPalette = result.palette;
        const description = result.description;

        if (
            typeof description !== "string" ||
            !description.trim()
        ) {
            throw new Error(
                "Gemini returned an invalid palette description."
            );
        }

        if (
            !Array.isArray(rawPalette) ||
            rawPalette.length !== 6
        ) {
            console.error("Invalid Gemini palette:", result);

            throw new Error(
                "Gemini did not return exactly 6 colors."
            );
        }

        const palette = rawPalette.map((color) => {
            // Already a valid HEX color
            if (isValidHex(color)) {
                return color;
            }

            // Try to extract a HEX color from extra text
            if (typeof color === "string") {
                const match = color.match(
                    /#[0-9A-Fa-f]{6}/
                );

                if (match) {
                    return match[0];
                }
            }

            return null;
        });

        if (
            palette.length !== 6 ||
            palette.some((color) => color === null)
        ) {
            console.error("Invalid Gemini palette:", result);

            throw new Error(
                "Gemini returned invalid HEX colors."
            );
        }

        return NextResponse.json({
            palette: palette as string[],
            description: description.trim(),
        });
        
    } catch (error) {
        console.error("AI PALETTE ERROR:", error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown AI palette error",
            },
            { status: 500 }
        );
    }
}