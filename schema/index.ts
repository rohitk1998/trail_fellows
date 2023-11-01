import * as yup from 'yup';

const loginValidationSchema: any = yup.object().shape({
  password: yup.string().required('Password is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const registerValidationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),

  lastName: yup.string().required('Last name is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be a 10-digit number')
    .required('Phone number is required'),

  country: yup.string().required('Country is required'),
});

export { loginValidationSchema, registerValidationSchema };
