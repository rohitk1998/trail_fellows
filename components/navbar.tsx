'use client'
import Image from "next/image"
import AppLogo from "../public/app_logo.png"



export default function CommonNavbar(){
    return(
     <div className="w-[100%] h-[70px] flex flex-row justify-between items-center">
        <div className="block px-2 py-2">
        <Image
        src={AppLogo}
        alt=""
        width={200}
        className="object-cover"
        />
        </div>
     </div>
    )
}