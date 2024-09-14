// import {GoogleGenerativeAI} from "@google/generative-ai";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
import {OpenAIApi, Configuration} from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

  

export async function getEmbeddings(text: string){
    try {

    const response = await openai.createEmbedding({
        model: "text-embedding-3-small",
        input: text.replace(/\n/g, " ")
    });

    const result = await response.json();
    console.log("This is response", result.data[0].embedding);
    return result.data[0].embedding as number[];

    
    } catch (error) {
        console.log("Error in getting embeddings", error);
        throw new Error("Error in getting embeddings");
        
    }
}




// export async function getEmbeddings(text: string){
//     try {

//         const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
//         text = text.replace(/\n/g, " ");

//         // const response = await openai.createEmbedding({
//         //     model: "text-embedding-3-small",
//         //     input: text.replace(/\n/g, " ")
           
//         // });
//         const result = await model.embedContent(text);
//         const embedding = result.embedding;
//         return result.embedding.values;
//     } catch (error) {
//         console.log("Error in getting embeddings", error);
//         throw new Error("Error in getting embeddings");
        
//     }
// }

