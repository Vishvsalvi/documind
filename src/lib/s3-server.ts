import AWS from "aws-sdk";
import fs from "fs";
import os from "os";
import path from "path";

export const downloadFromS3 = async (file_key: string) => {
    try {
        AWS.config.update({
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
        });
    
        const s3 = new AWS.S3({
        params: {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        },
        region: "eu-north-1"
        })
    
        const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        }
    
       const download = await s3.getObject(params).promise();
       const tempDir = os.tmpdir();
       const fileNameToSave = path.join(tempDir, `pdf-${Date.now()}.pdf`);
       fs.writeFileSync(fileNameToSave, download.Body as Buffer);
       return fileNameToSave;
    
    } catch (error) {
        throw new Error("Error in setting up AWS config");
    }
    }