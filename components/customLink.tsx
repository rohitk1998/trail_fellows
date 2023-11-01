'use client';

import Link from "next/link";
import React from "react";


interface CustomLinkProps {
    path : string ;
    title : string ;
}


export const CustomLink:React.FC<CustomLinkProps> = ({ path , title  })=> {
   return(
    <Link className="text-gray-400 mt-2" href={path}>{title}</Link>
   )
}