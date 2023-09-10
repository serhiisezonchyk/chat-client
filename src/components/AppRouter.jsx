import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { authRoutes, publicRoutes } from '../utils/routes';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/slices/auth.slice';

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
