import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../components/Nav';
import Footer from '../components/Footer';

import { toast } from 'sonner';

const UserLayout = ({ children }) => {

  return (
    <div>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
