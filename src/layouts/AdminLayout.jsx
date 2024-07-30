import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import AdminNavbar from '../components/AdminNavbar';
import Sidebar from '../components/AdminSidebar';

import { toast } from 'sonner';
import { Card } from '@nextui-org/react';

const AdminLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar isOpen={isSidebarOpen} />
      <div className='flex-1 flex flex-col w-full overflow-hidden'>
        <AdminNavbar onToggleSidebar={toggleSidebar} />
        <div className='flex-1 overflow-auto w-full'>
          <Card className='m-5 p-5'>{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
