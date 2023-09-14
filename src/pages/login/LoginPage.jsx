import React from 'react';
import './AuthPage.scss';
import { Link, Navigate } from 'react-router-dom';
import { MAIN_ROUTE, REGISTER_ROUTE } from '../../utils/consts';
import { SiRocketdotchat } from 'react-icons/si';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { login } from '../../store/services/user.service';
import { selectIsAuth } from '../../store/slices/auth.slice';
const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(login(values));
    if (data?.error?.message) {
      setError('password', {
        type: 'manual',
        message: data?.error?.message,
      });
      setValue('password', '');
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
        Please confirm your Login or Email and
        <br /> enter your password for log in.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='login-container'>
        <div className='login-form'>
          <div className='input-box'>
            <input
              placeholder='Login...'
              {...register('login', {
                required: 'Please enter your login/email.',
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
          <button>Log In</button>
        </div>
      </form>
      <Link to={REGISTER_ROUTE}>Or create new account...</Link>

    </div>
  );
};

export default LoginPage;
