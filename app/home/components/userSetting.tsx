'use client';

export const UserSettings = () => {
  return (
    <div>
      <div className="w-[90%] mt-11 p-3 border-[1px] mx-auto rounded-lg flex flex-col items-start justify-start shadow-md">
        <h2 className="text-md font-normal">Favrouites </h2>
        <h2 className="text-sm font-normal text-gray-400">No Fav </h2>
      </div>
      <div className="w-[90%] mt-11 p-3 border-[1px] mx-auto rounded-lg flex flex-col items-start justify-start shadow-md">
        <h2 className="text-md font-normal">Groups</h2>
        <h2 className="text-sm font-normal text-gray-400">No Group</h2>
      </div>
    </div>
  );
};
