import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
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

    const file_key = `${Date.now()}-${file.name}`;

    const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file
    }

    const upload = s3.upload(params).on("httpUploadProgress", (progress) => {
        console.log(progress);
    }).promise();

    await upload.then((data: any) => {
        console.log("File uploaded successfully", file_key);
    })


    return Promise.resolve({
        file_key,
        file_name: file.name
    })

  } catch (error) {
    throw new Error("Error in setting up AWS config");
  }
}

export function getS3FileUrl(file_key: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${file_key}`
}