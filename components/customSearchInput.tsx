'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchBarOpen, setSearchedPeople } from '../redux/slice/app.slice';
import { sendFriendRequest } from '@/redux/thunk/app.thunk';
import { useEffect } from 'react';
import Image from 'next/image';
import Searching from "../public/searching.png"

export const CustomSearchInput = ({ field }: { field: any }) => {
  const dispatch: any = useDispatch();
  const { isSearchBarOpened, searchedPeople } = useSelector(
    (state: any) => state.app
  );

  useEffect(() => {
     dispatch(setSearchedPeople([]))
  }, [isSearchBarOpened]);

  return (
    <div className="flex justify-center items-center w-[100%] h-[70px] relative">
      <input
        {...field}
        onFocus={() => dispatch(setSearchBarOpen(true))}
        className="focus:ring-2 focus:ring-gray-300 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-full py-2 pl-10 ring-1 ring-slate-200 shadow-sm "
        type="text"
        placeholder="Search Friend ..."
        autoComplete='off'
      />
      {isSearchBarOpened && (
        <div className="absolute bg-white border-[1px] w-[100%] h-[300px] top-[57px] rounded-md">
          {Array.isArray(searchedPeople) && searchedPeople.length > 0 ?
            searchedPeople.map((item) => (
              <div className="w-[100%] h-[60px] mt-2 mb-1 bg-white flex justify-between items-center p-2">
                <h6 className="text-[12px]">
                  {item.firstName + ' ' + item.lastName}
                </h6>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      sendFriendRequest({
                        userId: item.userId,
                        requestType: 'SINGLE',
                      })
                    );
                  }}
                  className="w-[80px] bg-blue-500 h-[30px] rounded-full"
                >
                  <p className="text-[10px] text-white left-auto">Add Friend</p>
                </button>
              </div>
            ))
          :

          <div className='w-[100%]  h-[300px] flex flex-col justify-center items-center'>
            <Image
            src={Searching}
            alt=''
            className='w-[150px] h-[150px] mb-2'
            />
            <p className='text-[12px] text-gray-300 w-[150px] mt-2'>Search for people around the world...</p>
           </div>
          }
        </div>
      )}
    </div>
  );
};
