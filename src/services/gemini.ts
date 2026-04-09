import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PlantingAdvice {
  cropName: string;
  location: string;
  optimalPlantingWindow: {
    start: string;
    end: string;
    reason: string;
  };
  expectedHarvestWindow: {
    start: string;
    end: string;
  };
  timeline: Array<{
    phase: string;
    duration: string;
    activities: string[];
    rainfallRequirement: string;
  }>;
  seasonalAdvice: string;
  rainfallAnalysis: string;
}

export async function getPlantingAdvice(location: string, crop: string): Promise<PlantingAdvice> {
  const prompt = `Act as an expert agricultural consultant. Provide a detailed planting calendar and growing timeline for ${crop} in ${location}. 
  Consider typical seasonal patterns and rainfall data for this region.
  
  Return the advice in a structured JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cropName: { type: Type.STRING },
          location: { type: Type.STRING },
          optimalPlantingWindow: {
            type: Type.OBJECT,
            properties: {
              start: { type: Type.STRING, description: "Month or specific date range" },
              end: { type: Type.STRING, description: "Month or specific date range" },
              reason: { type: Type.STRING }
            },
            required: ["start", "end", "reason"]
          },
          expectedHarvestWindow: {
            type: Type.OBJECT,
            properties: {
              start: { type: Type.STRING },
              end: { type: Type.STRING }
            },
            required: ["start", "end"]
          },
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "e.g., Land Preparation, Sowing, Vegetative, Flowering, Harvesting" },
                duration: { type: Type.STRING, description: "e.g., 2-3 weeks" },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } },
                rainfallRequirement: { type: Type.STRING }
              },
              required: ["phase", "duration", "activities", "rainfallRequirement"]
            }
          },
          seasonalAdvice: { type: Type.STRING },
          rainfallAnalysis: { type: Type.STRING }
        },
        required: ["cropName", "location", "optimalPlantingWindow", "expectedHarvestWindow", "timeline", "seasonalAdvice", "rainfallAnalysis"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Invalid response from AI service");
  }
}
