'use client';
import Image from 'next/image';
import AppLogo from '../public/app_logo.png';
import Profile from '../public/profile.svg';
import { CustomInput } from './customInput';
import { Controller, useForm } from 'react-hook-form';
import { CustomSearchInput } from './customSearchInput';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchBarOpen, setSearchedPeople } from '@/redux/slice/app.slice';
import { searchPeople } from '@/redux/thunk/app.thunk';

function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default function CommonNavbar() {
  const { isSearchBarOpened, currentUserProfile } = useSelector(
    (state: any) => state.app
  );

  const dispatch: any = useDispatch();

  const divRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: { formState: any; control: any; handleSubmit: any } = useForm({});

  const onSubmit = (data: any) => {
    console.log(data, data.search.length);
    if (data.search.toString().length > 1) {
      let payload: any = { searchBy: data.search };
      dispatch(searchPeople({ payload: payload }));
    } else {
      dispatch(setSearchedPeople([]));
    }
  };

  useOutsideClick(divRef, () => dispatch(setSearchBarOpen(false)));

  return (
    <div className="w-[100%] border-b-[1px]">
      <div
        className="
        grid 
        flex-row 
        justify-between 
        items-center
        grid-cols-3
        "
      >
        <div className="block pl-[60px] w-[100%] justify-center items-center">
          <Image src={AppLogo} alt="" width={150} className="object-cover" />
        </div>
        <div className="w-[100%] h-[70px]" ref={divRef}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => <CustomSearchInput field={field} />}
            />
          </form>
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-end pr-[60px]">
          <Image
            src={Profile}
            alt=""
            width={40}
            height={50}
            className="object-cover rounded-full"
          />
          <h1 className="text-md font-normal text-gray-400 ml-2">
            {currentUserProfile.firstName + ' ' + currentUserProfile.lastName}
          </h1>
        </div>
      </div>
    </div>
  );
}
