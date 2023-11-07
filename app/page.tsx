'use client';
import Image from 'next/image';
import RegisterLogo from '../public/registration_image.jpg';
import { useForm, Controller } from 'react-hook-form';
import { CustomInput } from '../components/customInput';
import AppLogo from '../public/app_logo.png';
import { useEffect, useState } from 'react';
import { loginValidationSchema, registerValidationSchema } from '@/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryList, loginUser, registerNewUser } from '@/redux/thunk/auth.thunk';
import { CustomSelect } from '@/components/customSelect';

const RegisterForm = ({ changeState }: { changeState: any }) => {
  const dispatch: any = useDispatch();
  const { countryList } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(fetchCountryList());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  }: { formState: any; control: any; handleSubmit: any } = useForm({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (data: any) => {
    data.gender = 'MALE';
    dispatch(registerNewUser({ payload: data }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4">
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="First name"
              errorMsg={errors.firstName ? errors.firstName.message : ''}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="Last name"
              errorMsg={errors.lastName ? errors.lastName.message : ''}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="Email"
              errorMsg={errors.email ? errors.email.message : ''}
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="Phone number"
              errorMsg={errors.phoneNumber ? errors.phoneNumber.message : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="Password"
              errorMsg={errors.password ? errors.password.message : ''}
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomSelect
              options={countryList}
              field={field}
              errorMsg={errors.country ? errors.country.message : ''}
            />
          )}
        />
      </div>
      <div className="flex flex-col w-[100%] items-center justify-center mt-5">
        <button
          className="bg-black rounded-md h-11 text-white w-[250px]"
          type="submit"
        >
          Next
        </button>
        <button
          className="bg-white border-[1px] rounded-md h-11 text-black w-[250px] mt-3"
          onClick={() => changeState()}
          onKeyDown={() => changeState()}
        >
          Login
        </button>
      </div>
    </form>
  );
};

const LoginForm = ({ changeState }: { changeState: any }) => {
  const dispatch : any  = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  }: { formState: any; control: any; handleSubmit: any } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: any ) => {
    dispatch(loginUser({ payload : data }))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4">
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              field={field}
              type="text"
              placeholder="Phone Number"
              errorMsg={errors.phoneNumber ? errors.phoneNumber.message : ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CustomInput
              errorMsg={errors.password ? errors.password.message : ''}
              field={field}
              type="text"
              placeholder="Password"
            />
          )}
        />
      </div>
      <div className="flex flex-col w-[100%] items-center justify-center mt-5">
        <button
          className="bg-black rounded-md h-11 text-white w-[250px]"
          type="submit"
        >
          Login
        </button>
        <button
          className="bg-white border-[1px] rounded-md h-11 text-black w-[250px] mt-3"
          onClick={() => changeState()}
          onKeyDown={() => changeState()}
        >
          Create an account
        </button>
      </div>
    </form>
  );
};

export default function Home() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { userToken } = useSelector((state: any) => state.auth);

  const changeFormTab = () => {
    setIsLoginForm(!isLoginForm);
  };
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div
        className="
      rounded-xl 
      xl:border-[1px] 
      lg:border-[1px] 
      sm:border-[1px] 
      md:border-[1px]
      border-none
      lg:w-[70%]
      md:w-[95%]
      w-[95%]
      "
      >
        <div className="flex w-[100%] items-center justify-center mt-5">
          <Image src={AppLogo} alt="" width={200} className="object-cover" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center items-center">
          <div className="p-4 w-[100%]">
            <Image alt="" src={RegisterLogo} className="object-fit" />
          </div>
          <div className="p-4 w-[100%] flex justify-center items-center">
            {isLoginForm ? (
              <LoginForm changeState={changeFormTab} />
            ) : (
              <RegisterForm changeState={changeFormTab} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
