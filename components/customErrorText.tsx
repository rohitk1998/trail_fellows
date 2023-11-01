'use client';



export const CustomErrorText = ({ text } : { text : string  })=> {
  return(
    <p className="text-rose-600 text-sm font-light ml-2 mt-1">{text}</p>
  )
}