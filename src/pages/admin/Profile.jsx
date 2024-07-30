// Import the required libraries
import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getProfileData } from "../../store/slices/user";

import QuoteInsuranceTable from '../../components/QuoteInsuranceTable';

import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus, faBuildingColumns, faUserPen, faDice, faPenToSquare, faUser, faLocationDot, faMapLocationDot, faGamepad, faReceipt, faCalendar, faLock, faWallet, faCreditCard, faListUl, faMoneyBillTransfer, faUpload, faTrashCan, faFileContract, faAdd } from "@fortawesome/free-solid-svg-icons";
import { Button, Avatar, Input, DatePicker, Tabs, Tab, Card, CardBody, Link, Select, SelectItem, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, CardHeader } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";


// Profile Component
const Profile = () => {
    const [selected, setSelected] = React.useState("personal");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const theme = useSelector((state) => state.theme.theme);
    const profileData = useSelector((state) => state.user.profile);

    if (!isLoggedIn) {
        toast.error("Debe iniciar sesión para acceder a esta página.");
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProfileData());
        }
    }, [isLoggedIn, dispatch]);


    if (!profileData) {
        return <p className="text-center text-gray-500 dark:text-gray-300">Cargando perfil...</p>;
    }
   
    return (
        <>
            <section className="relative pb-24 ">
                <div className="w-full max-w-7xl mx-auto px-1 md:px-8">
                    <div className='flex flex-col md:flex-row gap-5 items-center'>
                        <div className="flex flex-col gap-3 justify-center sm:justify-start z-10 mb-5">
                            <div>
                                <Avatar 
                                    isBordered 
                                    name={profileData?.firstName + " " + profileData?.lastName} 
                                    src={profileData?.profile_picture} 
                                    color="default" 
                                    className='w-36 h-36'
                                />
                            </div>           
                        </div>
                        <div className="flex items-center sm:items-start justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                            <div className="block">
                                <h3 className="font-manrope font-bold text-3xl text-gray-900 dark:text-white mb-1 max-sm:text-center">
                                    {profileData.firstName} {profileData.lastName}
                                </h3>
                                <p className="font-normal text-base leading-7 text-gray-500 dark:text-gray-400  max-sm:text-center">
                                    <FontAwesomeIcon icon={faUser} /> @{profileData.username} <br className="hidden sm:block"/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-col">
                        <Tabs 
                        aria-label="Options"  
                        color="primary"       
                        size='md'
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                        >
                            <Tab 
                            key="personal" 
                            title={
                                <div className="flex items-center space-x-1">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Mi Perfil</span>
                                </div>
                            }
                            >
                                <Card>
                                    <CardBody>
                                        <div className='flex flex-col sm:flex-row gap-3 justify-between items-center ml-2 mr-2 md:ml-9 md:mr-9 mt-9 mb-1'>
                                            <h2 className='text-3xl font-bold'>
                                                Mi Perfil
                                            </h2>
                                            <Button color="primary" startContent={<FontAwesomeIcon icon={faUserPen}/>}>
                                                Editar
                                            </Button> 
                                        </div>
                                        <div className="grid grid-cols-1 gap-6 m-2 md:m-9 md:grid-cols-2">
                                            <Input isReadOnly size="lg" type="email" label="Email" labelPlacement="outside" placeholder="email" value={profileData?.email}/>
                                            <Input isReadOnly size="lg" type="text" label="Username" labelPlacement="outside" placeholder="username" value={profileData?.username}/>
                                            <Input isReadOnly size="lg" type="text" label="Nombre" labelPlacement="outside" placeholder="nombre" value={profileData?.firstName}/>
                                            <Input isReadOnly size="lg" type="text" label="Apellido" labelPlacement="outside" placeholder="apellido" value={profileData?.lastName}/>
                                            <DatePicker isReadOnly size="lg" showMonthAndYearPickers label="Fecha de Nacimiento" labelPlacement="outside" formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }} value={parseDate(profileData?.dateOfBirth)}/>
                                        </div>
                                        <div className="ml-2 mr-2 mt-5 mb-5 md:ml-9 md:mr-9 md:mb-9">
                                            <Button
                                            color="primary"
                                            className='pl-6 pr-6'
                                            startContent={<FontAwesomeIcon icon={faLock}/>}
                                            >
                                                Cambiar contraseña
                                            </Button>
                                        </div>
                                    </CardBody>
                                </Card>  
                            </Tab>
                        </Tabs>
                    </div>  
                </div>
            </section>
        </>      
    );
}

export default Profile;