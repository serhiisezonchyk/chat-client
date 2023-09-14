import React from 'react';
import './AuthPage.scss';
import { Link, Navigate } from 'react-router-dom';
import { LOGIN_ROUTE, MAIN_ROUTE } from '../../utils/consts';
import { SiRocketdotchat } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../store/slices/auth.slice';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../store/services/user.service';
import { registerValidation } from '../../utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const formSchemaObject = zodResolver(registerValidation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: formSchemaObject,
  });

  const onSubmit = async (values) => {
    const data = await dispatch(registerUser(values));
    if (data?.error?.message) {
      setError('login', {
        type: 'manual',
        message: data?.error?.message,
      });
    } else {
      reset();
    }
  };
  if (isAuth) return <Navigate to={MAIN_ROUTE} />;

  return (
    <div className='login-page'>
      <div className='logo'>
        <SiRocketdotchat />
      </div>
      <h1>RocketChat</h1>
      <p>
        Please enter all fields and click
        <br /> 'Sign up' button to create new account
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='login-container'>
        <div className='login-form'>
          <div className='input-box'>
            <input
              placeholder='Login...'
              {...register('login', {
                required: 'Please enter your login.',
              })}
              className={errors.login && 'invalid-data'}
            />
            {errors.login && (
              <span role='alert' className='error'>
                {errors.login?.message}
              </span>
            )}
          </div>
          <div className='input-box'>
            <input
              placeholder='Email...'
              {...register('email', {
                required: 'Please enter your email.',
              })}
              className={errors.email && 'invalid-data'}
            />
            {errors.email && (
              <span role='alert' className='error'>
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className='input-box'>
            <input
              placeholder='Name...'
              {...register('name', {
                required: 'Please enter your name.',
              })}
              className={errors.name && 'invalid-data'}
            />
            {errors.name && (
              <span role='alert' className='error'>
                {errors.name?.message}
              </span>
            )}
          </div>
        </div>
        <div className='login-form'>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password...'
              {...register('password', {
                required: 'Please enter your password.',
              })}
              className={errors.password && 'invalid-data'}
            />
            {errors.password && (
              <span role='alert' className='error'>
                {errors.password?.message}
              </span>
            )}
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Repeat password...'
              {...register('check_password', {
                required: 'Please repeat your password.',
              })}
              className={errors.check_password && 'invalid-data'}
            />
            {errors.check_password && (
              <span role='alert' className='error'>
                {errors.check_password?.message}
              </span>
            )}
          </div>
          <button>Sign up</button>
        </div>
        <Link to={LOGIN_ROUTE}>Back to sign in...</Link>
      </form>
    </div>
  );
};

export default RegistrationPage;
