import { Pinecone } from '@pinecone-database/pinecone'
import { downloadFromS3 } from '../s3-server';
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf"
import {RecursiveCharacterTextSplitter, Document} from "@pinecone-database/doc-splitter"
import { getEmbeddings } from '../embeddings';
import md5 from 'md5'
import { Vector } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/data';

type PDFDocument = {
    pageContent: string;
    metadata: {
        loc: {pageNumber:string}
    }
}

export const pc = async () => {
    const pine =  new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
    })

    return pine;
}

export const convertToAscii = (str: string) => {
    return str.replace(/[^\x00-\x7F]/g, "");
}   

export const loadS3IntoPinecone = async (file_key: string) => {
    // 1. Obtain the file path from S3

    console.log("Loading file from S3")
    const file_path = await downloadFromS3(file_key);
    if (!file_path) {
        throw new Error("Error in downloading file from S3");
    }
    const pdfLoader = new PDFLoader(file_path);
    const docs = (await pdfLoader.load()) as PDFDocument[];

    // 2. Split the document into smaller segments
    const documents = await Promise.all(docs.map(prepareDocument));

    // 3. Vectorize and embed the individual documents
    const vector= await Promise.all(documents.flat().map(embedDocument));

    // 4. Upload the documents to Pinecone

    const pine = await pc();
    const pineIndex = pine.Index("documind")

    const namespace =  convertToAscii(file_key);

    await pineIndex.namespace(namespace).upsert(vector);
    console.log("Documents uploaded to Pinecone")

    return documents[0];
}

export const truncateStringToBytes = (str: string, maxBytes: number) => {

    const encoder = new TextEncoder();
    return new TextDecoder('utf-8').decode(encoder.encode(str).slice(0, maxBytes));
}

async function prepareDocument(page: PDFDocument) {
    let {pageContent, metadata} = page;
    pageContent = pageContent.replace(/\n/g, " "); // Remove new lines
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringToBytes(pageContent, 36000)
            }
        })
    ])
    return docs;
}

async function embedDocument(document: Document) {
    try {
        const embedding = await getEmbeddings(document.pageContent);
        const hash = md5(document.pageContent);

        return {
            id: hash,
            values: embedding,
            metadata: {
                text: document.metadata.text,
                pageNumber: document.metadata.pageNumber
            }
        } as Vector
        
    } catch (error) {
        throw new Error("Error in embedding document");
    }
}