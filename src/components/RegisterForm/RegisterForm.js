import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/operations';
import { selectRegisterError } from 'redux/auth/selectors';
import { updateErrorRegister } from 'redux/auth/authSlice';
import { useEffect } from 'react';

import {
  RegisterFormEl,
  RegisterFormInput,
  RegisterLabel,
  RegisterFormSubmitBtn,
  Error,
  InputError,
} from 'components/RegisterForm/RegisterForm.styled';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email('Not a proper email'),
  password: yup.string().min(6).required('Password is required'),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectRegisterError);

  useEffect(() => {
    dispatch(updateErrorRegister(error));
    return () => {
      dispatch(updateErrorRegister(null));
    };
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));

    if (error !== null) {
      resetForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <RegisterFormEl>
          <RegisterLabel>Username</RegisterLabel>
          <RegisterFormInput type="text" name="name" placeholder="Your name" />
          <InputError name="name" component="div" />

          <RegisterLabel>Email</RegisterLabel>
          <RegisterFormInput type="email" name="email" placeholder="email" />
          <InputError name="email" component="div" />

          <RegisterLabel>Password</RegisterLabel>
          <RegisterFormInput
            type="password"
            name="password"
            placeholder="password"
          />
          <InputError name="password" component="div" />

          <RegisterFormSubmitBtn type="submit">Sign up</RegisterFormSubmitBtn>
        </RegisterFormEl>
      </Formik>
      {error && <Error>Invalid data. Please try again</Error>}
    </>
  );
};
