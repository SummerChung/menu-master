import { GoogleGenAI, Type } from "@google/genai";
import { MenuCategory } from '../types';

// Initialize Gemini with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert file to base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Analyze menu images using Gemini
export const analyzeMenu = async (base64Images: string[], targetLanguage: string): Promise<MenuCategory[]> => {
  try {
    const model = 'gemini-2.5-flash';

    // Create image parts for all uploaded pages
    const imageParts = base64Images.map(img => ({
      inlineData: {
        mimeType: 'image/jpeg',
        data: img
      }
    }));

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          ...imageParts,
          {
            text: `Analyze these menu images (there may be multiple pages). Extract all food and drink items from ALL pages.
            Group them into logical categories (e.g., Appetizers, Yakitori, Main, Drinks) based on the visual layout.
            If the same category appears on multiple pages, merge them.
            
            For each item, provide:
            1. originalName: The exact name on the menu (usually in the local language like Japanese).
            2. translatedName: Translate the name into ${targetLanguage}.
            3. description: A short, appetizing description (max 10 words) in ${targetLanguage}.
            4. price: The numeric price (numbers only, ignore symbols).

            Return a structured JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
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
    });

    let text = response.text;
    if (!text) throw new Error("No data returned from Gemini");

    // Clean up markdown code blocks if present (just in case)
    if (text.startsWith("```json")) {
      text = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (text.startsWith("```")) {
      text = text.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    const rawData = JSON.parse(text);

    // Post-process to ensure IDs exist
    const categories: MenuCategory[] = rawData.map((cat: any, catIndex: number) => ({
      name: cat.name || "General",
      items: (cat.items || []).map((item: any, itemIndex: number) => ({
        id: `item-${catIndex}-${itemIndex}-${Date.now()}`,
        originalName: item.originalName || "Unknown",
        translatedName: item.translatedName || item.originalName,
        description: item.description || "",
        price: Number(item.price) || 0
      }))
    }));

    return categories;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};