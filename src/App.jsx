import React from 'react';
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import { check } from './store/services/user.service';
import { authActions } from './store/slices/auth.slice';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(check());
    dispatch(authActions.initColorTheme());
  }, []);
  return <AppRouter/>;
}

export default App;
