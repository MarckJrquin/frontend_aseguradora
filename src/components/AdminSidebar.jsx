import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronCircleLeft, faChevronCircleRight, faFile, faHandsHoldingCircle, faHome, faQuoteLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Avatar, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Link } from "@nextui-org/react";
import { signout } from "../store/slices/auth"; // Asegúrate de tener el slice correcto
import { toast } from 'sonner';

const SidebarContext = createContext();

export default function AdminSidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.user.profile);

  const handleLogout = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signout());
    if (signout.fulfilled.match(resultAction)) {
      toast.success('Sesión Cerrada');
      navigate('/');
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isSmallScreen]);

  return (
    <aside className="flex flex-col h-screen shadow-sm">
      <nav className="h-full flex flex-col bg-zinc-100 dark:bg-zinc-800 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`flex overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
          >
            <FontAwesomeIcon icon={faHandsHoldingCircle} className="font-bold text-black dark:text-white"/>
            <p className="font-bold text-black dark:text-white pl-2">
              Aseguradora
            </p>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100"
          >
            {expanded ? <FontAwesomeIcon icon={faChevronCircleLeft}/> : <FontAwesomeIcon icon={faChevronCircleRight}/>}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem icon={<FontAwesomeIcon icon={faHome} />} text="Inicio" href="/admin/home" />
            <SidebarItem icon={<FontAwesomeIcon icon={faFile} />} text="Cotizaciones" href="/admin/all-quote-insurances" />
            <SidebarItem icon={<FontAwesomeIcon icon={faUsers} />} text="Usuarios" href="/admin/users" />
            {children}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 flex items-center">
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
              <DropdownItem key="myprofile" as={Link} href="/admin/profile" className="text-black dark:text-white">Mi Perfil</DropdownItem>
              <DropdownItem key="help" as={Link} href="/" className="text-black dark:text-white">Ayuda</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className={`
              flex flex-col justify-between 
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}>
            <p>{profileData?.firstName + " " + profileData?.lastName}</p>
            <p>@{profileData?.username}</p>
          </div>
        </div>
      </nav>
    </aside>
  );
}

const SidebarItem = ({ icon, text, href, alert }) => {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  const isActive = location.pathname === href;

  return (
    <li
      onClick={handleClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-500 text-gray-600 hover:text-gray-100 dark:text-gray-300 "
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400  ${expanded ? "" : "top-2"}`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
};
