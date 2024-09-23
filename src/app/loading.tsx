import React from 'react'
import { LoaderCircle } from 'lucide-react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-full h-screen items-center flex justify-center bg-gray-800' >
   
    Loading  <LoaderCircle className='animate-spin' size={20} />
    </div>
  )
}

export default Loading