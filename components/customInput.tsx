'use client';

import React from 'react';
import { CustomErrorText } from './customErrorText';

interface CustomInputProps {
  type: string;
  placeholder: string;
  field: object;
  errorMsg: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  field,
  errorMsg,
}) => {
  return (
    <div>
      <input
        className="border-[1px] outline-offset-0 border-gray-100 rounded-lg px-3 h-9 outline-none w-[100%] mt-3"
        type={type}
        placeholder={placeholder}
        {...field}
      />
      <CustomErrorText text={errorMsg} />
    </div>
  );
};
