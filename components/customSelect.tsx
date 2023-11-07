'use client';

import { CustomErrorText } from './customErrorText';

export const CustomSelect = ({
  options,
  field,
  errorMsg,
}: {
  options: any;
  field: any;
  errorMsg: string;
}) => {
  return (
    <div>
      <select
        className="border-[1px] outline-offset-0 border-gray-100 rounded-lg px-3 h-9 outline-none w-[100%] mt-3 text-gray-400 bg-white text-"
        
        {...field}
      >
        {Array.isArray(options) &&
          options.map((option: any) => {
            return (
              <option key={option.ctryCode} value={option.ctryBDesc}>
                {option.ctryBDesc}
              </option>
            );
          })}
      </select>
      <CustomErrorText text={errorMsg} />
    </div>
  );
};
