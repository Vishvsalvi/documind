import { Pinecone } from '@pinecone-database/pinecone';
import { convertToAscii } from './db/pinecone';
import { getEmbeddings } from './embeddings';

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string){
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const index = pc.Index("documind");

    try {
        const namespace = convertToAscii(fileKey);
        const response = await index.namespace(namespace).query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
            
        })
        return response.matches || [];
    } catch (error) {
        console.log("error querying embeddings ",error);
        return;
        
    }

}

export async function getContext(query:string, fileKey:string){

    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
    const qualifier = matches!.filter((match) => match.score && match.score > 0.1);
    let docs = qualifier.map((match) => {
        if(match.metadata) return (match.metadata).text       
    })
    console.log("query string ",query);
    console.log("matches ",docs);
    return docs.join("\n").substring(0, 2500);

}