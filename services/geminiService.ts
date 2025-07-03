
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { FactSheetData } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

export const generateFactSheetFromGemini = async (personName: string, apiKey: string): Promise<FactSheetData> => {
  if (!apiKey) {
    throw new Error("Gemini API Key is not provided. Cannot make API calls.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
Generate a fact sheet for "${personName}".
Imagine you have searched Wikipedia, Google Scholar for information about this person.
Based on publicly available information (or typical information found for a public figure if this person is not widely known or is fictional) Please provide a summary with the source of the citation in the following JSON format.
Ensure all fields in the JSON are populated.

The JSON output MUST follow this structure EXACTLY:
{
  "primaryConnections": ["Connection 1 (e.g., Colleague at Company X, Co-founder of Y)", "Connection 2 (e.g., Mentor Z)", "..."],
  "education": ["Degree in Subject from University A (Year)", "PhD in Another Subject from University B (Year)", "..."],
  "keyMembershipsAwards": ["Member of Organization C", "Recipient of Award D (Year)", "Fellow of Institute E", "..."],
  "tenThings": [
    "A relevant fact about the person.",
    "Another interesting detail concerning the person.",
    "A key achievement or characteristic.",
    "Information regarding their background or career.",
    "A notable event or contribution.",
    "A public perception or well-known aspect.",
    "A less common but significant piece of information.",
    "A point related to their impact or influence.",
    "A specific skill or expertise.",
    "A concluding important fact about them."
  ]
}

Provide at least 2-3 items for connections, education, and memberships/awards if possible.
Provide exactly 10 concise and interesting facts for the 'tenThings' array. Each fact in 'tenThings' MUST be about or directly relate to "${personName}".
Do not include any introductory text or explanations outside the JSON structure itself.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      },
    });

    let jsonStr = response.text.trim();
    
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (
      !parsedData ||
      !Array.isArray(parsedData.primaryConnections) ||
      !Array.isArray(parsedData.education) ||
      !Array.isArray(parsedData.keyMembershipsAwards) ||
      !Array.isArray(parsedData.tenThings) ||
      parsedData.tenThings.length !== 10
    ) {
      console.error("Malformed JSON data structure received from API:", parsedData);
      throw new Error("Received malformed or incomplete JSON data from API. Expected specific fields and 10 'tenThings' items.");
    }
    
    return parsedData as FactSheetData;

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes("api key not valid")) {
            throw new Error(`Your API Key is not valid. Please check the key and try again.`);
        }
         throw new Error(`Gemini API request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching data from Gemini API.");
  }
};
