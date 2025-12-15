import { GoogleGenAI, Type } from "@google/genai";
import { MenuAnalysisResult, MenuCategory } from '../types';

export interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

// Helper to convert file to base64 with correct mime type
export const fileToGenerativePart = async (file: File): Promise<GenerativePart> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Extract mime type and base64 data
      // format: "data:image/jpeg;base64,....."
      const match = base64String.match(/^data:(.*?);base64,(.*)$/);
      
      if (match) {
        resolve({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      } else {
        reject(new Error("Failed to process image file."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Analyze menu images using Gemini
export const analyzeMenu = async (imageParts: GenerativePart[], targetLanguage: string): Promise<MenuAnalysisResult> => {
  // Retrieve API Key from standard Vite env injection
  // @ts-ignore
  let rawApiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;

  // SANITIZATION STEP:
  // Remove any surrounding quotes (" or ') and whitespace that might have been copied into Vercel
  const apiKey = rawApiKey ? rawApiKey.replace(/["']/g, "").trim() : "";

  if (!apiKey || apiKey === 'undefined') {
      console.error("API Key check failed. Value is missing.");
      throw new Error("API Key is missing. Please check Vercel Settings > Environment Variables.");
  }

  // Initialize client inside the function to ensure we use the latest key
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const model = 'gemini-2.5-flash';

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          ...imageParts,
          {
            text: `Analyze these menu images. 
            1. Identify the language of the menu (e.g., Japanese, Italian).
            2. Create a polite "ordering phrase" in THAT identified language meaning "Excuse me, I would like to order this" (e.g., if Japanese, return "すみません、これを注文したいです").
            3. Extract all food/drink items. Group them into logical categories.
            4. Translate item names and descriptions into ${targetLanguage}.
            
            Return a JSON object.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            orderingPhrase: {
                type: Type.STRING,
                description: "The phrase 'Excuse me, I would like to order this' in the MENU'S original language."
            },
            categories: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                    name: { type: Type.STRING, description: "Category name in target language" },
                    items: {
                        type: Type.ARRAY,
                        items: {
                        type: Type.OBJECT,
                        properties: {
                            originalName: { type: Type.STRING },
                            translatedName: { type: Type.STRING },
                            description: { type: Type.STRING },
                            price: { type: Type.NUMBER },
                        }
                        }
                    }
                    }
                }
            }
          }
        }
      }
    });

    let text = response.text;
    if (!text) throw new Error("No data returned from Gemini");

    // Clean up markdown code blocks if present
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const rawData = JSON.parse(text);

    // Post-process to ensure IDs exist
    const categories: MenuCategory[] = (rawData.categories || []).map((cat: any, catIndex: number) => ({
      name: cat.name || "General",
      items: (cat.items || []).map((item: any, itemIndex: number) => ({
        id: `item-${catIndex}-${itemIndex}-${Date.now()}`,
        originalName: item.originalName || "Unknown",
        translatedName: item.translatedName || item.originalName,
        description: item.description || "",
        price: Number(item.price) || 0
      }))
    }));

    return {
        categories,
        orderingPhrase: rawData.orderingPhrase || ""
    };

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    // Improve error message if it's a 400 or 403
    if (error.message?.includes('403') || error.message?.includes('API key')) {
        throw new Error("Invalid API Key. Google rejected the key. Please ensure you are using a valid AI Studio key without IP restrictions.");
    }
    throw error;
  }
};