import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ToogleTheme from './ToggleTheme';
import { toggleTheme } from '../store/slices/theme';
import { signout } from "../store/slices/auth";
import { getProfileData } from "../store/slices/user";

import { toast } from 'sonner';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHoldingCircle } from "@fortawesome/free-solid-svg-icons";


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useSelector((state) => state.theme.theme);
  const profileData = useSelector((state) => state.user.profile);

  const menuItemsNav = [
    { name: "Inicio", path: "/home" },
    ...(isLoggedIn ? [{ name: "Cotizar", path: "/quote-insurance" }] : []),
    { name: "Nosotros", path: "/us" },
    { name: "Servicios", path: "/services" },
    { name: "Seguros", path: "/insurance" },
    { name: "Blog", path: "/blog" },
    { name: "Ayuda", path: "/help" },
  ];

  const menuItems = [
    { name: "Inicio", path: "/home" },
    ...(isLoggedIn ? [{ name: "Cotizar", path: "/quote-insurance" }] : []),
    { name: "Nosotros", path: "/us" },
    { name: "Servicios", path: "/services" },
    { name: "Seguros", path: "/insurance" },
    { name: "Blog", path: "/blog" },
    { name: "Ayuda", path: "/help" },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfileData());
    }
  }, [isLoggedIn, dispatch]);

  const handleLogout = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signout());
    if (signout.fulfilled.match(resultAction)) {
      toast.success('Sesión Cerrada');
      navigate('/');
      window.location.reload();
    }
  };


  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href="/home">
          {/* <img src={image} alt="aseguradora Logo" className="h-8 w-auto"/> */}
          <FontAwesomeIcon icon={faHandsHoldingCircle} className="font-bold text-black dark:text-white"/>
          <p className="font-bold text-black dark:text-white pl-2">
            Aseguradora
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItemsNav.map((item) => (
          <NavbarItem key={item.name} isActive={location.pathname === item.path}>
            <Link color="foreground" href={item.path}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
          
      { !isLoggedIn 
      ? 
        <NavbarContent justify="end">   
          <ToogleTheme 
            theme={theme} 
            switchTheme={() => dispatch(toggleTheme())}
          />
          <NavbarItem className="hidden lg:flex" >
            <Button as={Link} color="primary" href="/login" variant="ghost">
              Iniciar Sesión
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" >
              Registrarse
            </Button>
          </NavbarItem>
        </NavbarContent>
      : 
        <NavbarContent as="div" justify="end">
          <ToogleTheme 
            theme={theme} 
            switchTheme={() => dispatch(toggleTheme())}
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                size="sm"
                name={profileData?.firstName + " " + profileData?.lastName}
                src={profileData?.avatarUrl}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-sm">Sesión iniciada como</p>
                <p className="font-semibold text-sm">{profileData?.email}</p>
              </DropdownItem>
              <DropdownItem key="myprofile" as={Link} href="/profile" className="text-black dark:text-white">Mi Perfil</DropdownItem>
              <DropdownItem key="help" as={Link} href="/help" className="text-black dark:text-white">Ayuda</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      }
      
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`} isActive={location.pathname === item.path}>
            <Link
              color={"foreground"}
              isActive={location.pathname === item.path}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
 export default Nav;