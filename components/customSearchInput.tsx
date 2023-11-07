'use client';

import { useDispatch, useSelector } from "react-redux";
import  { setSearchBarOpen } from "../redux/slice/app.slice";


export const CustomSearchInput = ({ field }: { field: any}) => {
    const dispatch : any = useDispatch();
    const { isSearchBarOpened } = useSelector((state : any )=> state.app)

  return (
    <div className="flex justify-center items-center w-[100%] h-[70px] relative">
      <input
        {...field}
        onFocus={()=> dispatch(setSearchBarOpen(true))}
        className="focus:ring-2 focus:ring-gray-300 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 shadow-sm "
        type="text"
        placeholder="Search Friend ..."
      />
      {isSearchBarOpened && (
            <div className="absolute bg-white border-[1px] w-[100%] h-[300px] top-[57px] rounded-md"></div>
          )}
    </div>
  );
};
