import { GoogleGenAI } from "@google/genai";
import { TattooStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to extract base64 from response
const extractBase64Image = (response: any): string | null => {
  // Check candidates structure
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) return null;

  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return part.inlineData.data;
    }
  }
  return null;
};

export const generateTattooMeaning = async (
  description: string, 
  style: TattooStyle
): Promise<string> => {
  const prompt = `
    You are an expert Tattoo Artist and Historian.
    Write a short, engaging description for a tattoo design based on this request: "${description}" in the style of "${style}".
    
    CRITICAL INSTRUCTION: WRITE THE ENTIRE RESPONSE IN PORTUGUESE (BRAZIL).

    Structure your response in HTML format (using <p>, <strong>, <ul>, <li> tags only) but do not wrap it in code blocks or html/body tags.
    
    Include:
    1. <strong>Elementos Visuais:</strong> Briefly describe the key visual components and characters that should appear.
    2. <strong>Simbolismo:</strong> Explain the deeper meaning, cultural significance, or emotional representation of these elements.
    
    Keep it professional, artistic, and inspiring for a client consultation. Limit to 150 words.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Descrição indisponível.";
  } catch (error) {
    console.error("Meaning generation failed", error);
    return "Não foi possível gerar a análise simbólica no momento.";
  }
};

export const generateTattooSet = async (
  description: string,
  style: TattooStyle,
  referenceImage?: string | null
): Promise<{ colorImage: string; stencilImage: string }> => {
  
  // Refined prompt to ensure design-only output and strict anatomy adherence
  const colorPrompt = `
    Create a professional 2D TATTOO DESIGN based on this description: "${description}".
    
    Style: ${style}.
    
    CRITICAL INSTRUCTIONS:
    1. Output strictly the TATTOO ARTWORK/DESIGN on a SOLID WHITE background.
    2. Do NOT generate a photo of a person, a model, or a body part unless specifically asked to show placement (and even then, focus on the ink).
    3. ANATOMY PRECISION: If the user specifies a specific part like "Forearm" (Antebraço), do NOT generate a full sleeve. If they say "Full Arm", generate a full sleeve. Respect the boundaries of the requested body part.
    4. If the input contains words like "modelo" (model), interpret it as "design template" or "motif", NOT a human fashion model.
    5. No skin texture, no realistic lighting on skin. Just the graphic art.
    6. High quality, clean lines, artistic masterpiece.
  `;

  const contentsParts: any[] = [];
  
  // Add reference image if provided
  if (referenceImage) {
    const base64Data = referenceImage.split(',')[1] || referenceImage;
    // Simple mime type detection or default to png
    const mimeMatch = referenceImage.match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';

    contentsParts.push({
      inlineData: {
        mimeType: mimeType,
        data: base64Data
      }
    });
    
    // Add text instruction to use the image
    contentsParts.push({ text: "Use the attached image as a visual reference for composition or subject, but adapt it to the requested description and style." });
  }

  // Add the main prompt
  contentsParts.push({ text: colorPrompt });

  const colorResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: contentsParts
    },
    config: {
      // Gemini 2.5 Flash Image defaults
    }
  });

  const colorBase64 = extractBase64Image(colorResponse);
  if (!colorBase64) {
    throw new Error("Falha ao gerar o design da tatuagem.");
  }

  // 2. Generate the stencil based on the colored design (Image-to-Image)
  const stencilPrompt = `Convert this tattoo design into a precise black and white line art stencil (decalque) for a tattoo artist. 
  High contrast, solid white background, black lines only. 
  No shading, no gradients, no color. 
  Clean, crisp outlines suitable for thermal printing.`;

  const stencilResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/png',
            data: colorBase64
          }
        },
        { text: stencilPrompt }
      ]
    }
  });

  const stencilBase64 = extractBase64Image(stencilResponse);
  if (!stencilBase64) {
    console.warn("Stencil generation failed, returning original.");
    return { colorImage: colorBase64, stencilImage: colorBase64 };
  }

  return {
    colorImage: colorBase64,
    stencilImage: stencilBase64
  };
};