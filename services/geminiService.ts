import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

// Fix: Use `process.env.API_KEY` to get the API key as per the coding guidelines. This resolves the TypeScript error with `import.meta.env`.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // Fix: Updated error message to align with the change to `process.env.API_KEY`.
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
};

/**
 * Generiert Meme-Unterschriften für ein Bild.
 * @param base64 The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @returns A promise that resolves to an array of caption strings.
 */
export const generateCaptions = async (base64: string, mimeType: string): Promise<string[]> => {
  const imagePart = fileToGenerativePart(base64, mimeType);
  const prompt = `Du bist ein witziger Gamer, der Battlefield 6 liebt. Analysiere dieses Bild und erstelle 5 kurze, lustige und relevante Meme-Unterschriften. Die Unterschriften sollten im Stil von Insider-Witzen von Battlefield-Spielern oder häufigen Spielsituationen sein. Gib ein JSON-Objekt mit einem 'captions'-Schlüssel zurück, der ein Array von Strings enthält.`;
  
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    captions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ['captions']
            }
        }
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed.captions && Array.isArray(parsed.captions)) {
        return parsed.captions.slice(0, 5); // Ensure only 5 are returned
    }
    
    console.warn("Unerwartete JSON-Struktur:", parsed);
    throw new Error("Fehler beim Parsen der Bildunterschriften aus der API-Antwort.");

  } catch (error) {
    console.error("Fehler beim Generieren der Bildunterschriften:", error);
    throw new Error("Konnte keine Bildunterschriften von der Gemini-API generieren.");
  }
};


/**
 * Bearbeitet ein Bild basierend auf einer Textanweisung.
 * @param base64 The base64 encoded image data.
 * @param mimeType The MIME type of the image.
 * @param prompt The text prompt describing the desired edit.
 * @returns A promise that resolves to the base64 encoded string of the edited image.
 */
export const editImage = async (base64: string, mimeType: string, prompt: string): Promise<string> => {
    const imagePart = fileToGenerativePart(base64, mimeType);
    
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
            return firstPart.inlineData.data;
        }

        throw new Error("Keine Bilddaten in der API-Antwort gefunden.");

    } catch (error) {
        console.error("Fehler beim Bearbeiten des Bildes:", error);
        throw new Error("Konnte das Bild nicht mit der Gemini-API bearbeiten.");
    }
};