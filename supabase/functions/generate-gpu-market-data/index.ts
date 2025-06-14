
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gpuModel, basePrice, datacenter } = await req.json();

    const prompt = `You are a GPU cloud marketplace analyst. Generate realistic market data for the following GPU rental:

GPU Model: ${gpuModel}
Base Price: $${basePrice}/hour
Datacenter: ${datacenter}

Please provide a JSON response with the following structure:
{
  "currentPrice": number (realistic hourly price in USD, considering current market conditions),
  "priceMultiplier": number (between 0.7-1.5, representing market demand),
  "availabilityStatus": "available" | "limited" | "unavailable",
  "reliabilityScore": number (between 0.85-0.99),
  "marketTrend": "up" | "down" | "stable",
  "demandLevel": "low" | "medium" | "high",
  "reasoningFactors": string[] (3-4 factors affecting price/availability)
}

Base your response on real cloud GPU pricing trends, current AI/ML market demand, and datacenter location economics. Make it realistic and varied.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response');
    }
    
    const marketData = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(marketData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-gpu-market-data function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      // Fallback data
      currentPrice: 1.0,
      priceMultiplier: 1.0,
      availabilityStatus: "available",
      reliabilityScore: 0.95,
      marketTrend: "stable",
      demandLevel: "medium",
      reasoningFactors: ["Standard market conditions"]
    }), {
      status: error.message.includes('Gemini API') ? 500 : 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
