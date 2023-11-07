'use client';

export const UserProfile = () => {
  return (
    <div className="w-[90%] mt-11 p-3 border-[1px] mx-auto rounded-lg">
        <div className="flex flex-col justify-center items-center">
         <div className="w-[25%] flex items-center justify-center p-5">
         <img
            className="w-[170px] h-[170px] rounded-full object-cover"
            src="https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Contact Image"
          />
         </div>
         <div className="w-[75%] h-[40px] flex flex-col items-center justify-center">
          <h2 className="text-xl font-normal">John Doe</h2>
          <p className="text-gray-600 text-sm">
            Hey, Welcome to TrailFellows 
          </p>
         </div>
        </div>
    </div>
  );
};
