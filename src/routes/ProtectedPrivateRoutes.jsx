import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from "../store/slices/auth";
import { toast } from 'sonner';

const ProtectedPrivateRoutes = ({ children }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const resultAction = await dispatch(signout());
    if (signout.fulfilled.match(resultAction)) {
      toast.success('Sesión Cerrada');
      navigate('/');
      window.location.reload();
    }
  };

  if (!isLoggedIn) {
    toast.error("Debe iniciar sesión para acceder a esta página.");
    return <Navigate to="/login" />;
  }

  if (user.role !== 'Admin') {
    toast.error("No tiene permisos para acceder a esta página.");
    handleLogout();
  }

  return (
      <main>{children}</main>
  );
};

export default ProtectedPrivateRoutes;
