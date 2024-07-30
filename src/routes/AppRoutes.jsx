import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/slices/auth';

import { Routes, Route, useNavigate } from "react-router-dom";

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';

import ProtectedPublicRoutes from './ProtectedPublicRoutes';
import ProtectedPrivateRoutes from './ProtectedPrivateRoutes';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

import Home from '../pages/public/Home';
import Profile from '../pages/public/Profile';
import QuoteInsurance from '../pages/public/QuoteInsurance';

import Dashboard from '../pages/admin/Dashboard';
import Users from '../pages/admin/Users';
import AllQuoteInsurance from '../pages/admin/QuoteInsurances';
import AdminProfile from '../pages/admin/Profile';

import PageNotFound from "../pages/Errors/PageNotFound";

const App = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
      if (isLoggedIn) {
          dispatch(getCurrentUser());
      }
  }, [dispatch, isLoggedIn]);


  return (
      <Routes>
         {/* Rutas Autenticación */}
        <Route path="/login" element={<UserLayout><Login /></UserLayout>} />
        <Route path="/register" element={<UserLayout><Register /></UserLayout>} />

        {/* Rutas Públicas */}
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/home" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/quote-insurance" element={<ProtectedPublicRoutes><UserLayout><QuoteInsurance /></UserLayout></ProtectedPublicRoutes>} />
        <Route path="/profile" element={<ProtectedPublicRoutes><UserLayout><Profile /></UserLayout></ProtectedPublicRoutes>} />

        {/* Rutas Privadas */}
        <Route path="/admin" element={<ProtectedPrivateRoutes><AdminLayout><Dashboard /></AdminLayout></ProtectedPrivateRoutes>} />
        <Route path="/admin/home" element={<ProtectedPrivateRoutes><AdminLayout><Dashboard /></AdminLayout></ProtectedPrivateRoutes>} />
        <Route path="/admin/dashboard" element={<ProtectedPrivateRoutes><AdminLayout><Dashboard /></AdminLayout></ProtectedPrivateRoutes>} />
        <Route path="/admin/all-quote-insurances" element={<ProtectedPrivateRoutes><AdminLayout><AllQuoteInsurance /></AdminLayout></ProtectedPrivateRoutes>} />
        <Route path="/admin/users" element={<ProtectedPrivateRoutes><AdminLayout><Users /></AdminLayout></ProtectedPrivateRoutes>} />
        <Route path="/admin/profile" element={<ProtectedPrivateRoutes><AdminLayout><AdminProfile /></AdminLayout></ProtectedPrivateRoutes>} />

        {/* Rutas de Errores */}
        <Route path="*" element={<PageNotFound />} />   
      </Routes>
  );
};

export default App;


