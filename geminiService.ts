import { GoogleGenerativeAI } from "@google/generative-ai";

// 這裡會去讀取 Vercel 上的環境變數
const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY || "");

export async function getItinerary(destination: string, days: number) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `請幫我規劃一個去${destination}${days}天的旅行行程，請用繁體中文，格式清晰。`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI 生成失敗:", error);
    return "抱歉，行程生成出現錯誤，請檢查 API Key 設定。";
  }
}
