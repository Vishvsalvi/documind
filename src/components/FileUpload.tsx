"use client"
import React, {useState} from 'react'
import { FileText, Loader } from "lucide-react"
import { useDropzone } from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'
import { useRouter } from 'next/navigation'


const FileUpload = () => {

  const router = useRouter();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string, file_name: string }) => {
     
      const response = await axios.post('/api/create-chat', { file_key, file_name });
      return response.data;
    }
  })

  const { getRootProps, getInputProps } = useDropzone(
    {
      accept: { "application/pdf": [".pdf"] },
      maxFiles: 1,
      onDrop: async (acceptedFiles) => {
        
        const file = acceptedFiles[0];

        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: "File size should be less than 10MB",
            variant: "destructive"
          })
          return;
        }

        try {
          setUploading(true);
          const data = await uploadToS3(file);
          if(!data.file_key || !data.file_name) {
            toast({
              title: "Error in uploading file 😓",
              variant: "destructive"
            })
            return;
          }
          mutate(data, {
            onSuccess: ({chat_id}) => {
              
              toast({
                title: "File uploaded successfully🎉",
                variant: "success"
        
              })
              router.push(`/chat/${chat_id}`)
              
            },
            onError: (error) => {
              toast({
                title: "Error in uploading file 😓",
                variant: "destructive"
              })
              console.log(error);
            }
          })
         
        } catch (error) {
          console.log(error);
        } finally {
          setUploading(false);
        }

      }
    }
  );

  return (
    <div className='w-full' >
      <label htmlFor="uploadFile1"
        className="bg-neutral-950 text-gray-300 text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto "
        {...getRootProps()}
      >
        {
          uploading || isPending ? (<Loader className='animate-spin' />) : ( <><FileText />
        <p>Drop your PDF here, or click to upload ✨</p></> )
        }
       
     <input {...getInputProps()} />
        <p className="text-xs font-medium text-gray-400 mt-2">
          {uploading || isPending ? "Your pdf is being processed" : "PDF files only, max 10MB and 5 pages"}
        </p>
      </label></div>
  )
}

export default FileUpload