import './App.css'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './store/slices/theme';

import Toaster from './components/Toaster';
import AppRoutes from './routes/AppRoutes';


function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const switchTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <AppRoutes/>
      <Toaster />
    </>
  )
}

export default App
