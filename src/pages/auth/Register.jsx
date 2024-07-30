import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signup } from "../../store/slices/auth";

import { toast } from 'sonner'
import { Input, Button, DatePicker, Link} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

import {parseDate, getLocalTimeZone} from "@internationalized/date";


const isValidDate = (date) => {
    if (!date) return false;
    try {
        return date.calendar && !isNaN(new Date(date.toString({ calendar: 'gregory' })).getTime());
    } catch {
        return false;
    }
};


const Register = () => {
    const [formData, setFormData] = useState({
        Username: "",
        Email: "",
        Password: "",
        confirmPassword: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: parseDate("1999-10-30")
    });
    const [registerData, setRegisterData ] = useState(null);
    const [errors, setErrors] = useState({});
    const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleB, setIsVisibleB] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn && user) {
            if (user.role === 'Admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/home');
            }
        }
    }, [isLoggedIn, user, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleClearInputChange = (name) => {
        setFormData({ ...formData, [name]: '' });
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, DateOfBirth: date });
        if (!isValidDate(date)) {
            setErrors({ ...errors, DateOfBirth: "Por favor, ingrese una fecha valida" });
        } else {
            setErrors({ ...errors, DateOfBirth: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.Username) newErrors.Username = "El username es requerido";
        if (!formData.Email) newErrors.Email = "El correo es requerido";
        if (formData.Email && !/\S+@\S+\.\S+/.test(formData.Email)) newErrors.Email = "El correo no tiene un formato adecuado";
        if (!formData.FirstName) newErrors.FirstName = "El nombre es requerido";
        if (!formData.LastName) newErrors.LastName = "El apellido es requerido";
        if (!formData.Password) newErrors.Password = "La contraseña es requerida";
        if (!formData.confirmPassword) newErrors.confirmPassword = "La confirmación de la contraseña es requerida";
        if (formData.Password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
        if (!isValidDate(formData.DateOfBirth)) newErrors.DateOfBirth = "Por favor, ingrese una fecha valida";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const clearForm = () => {
        setFormData({
            Username: "",
            Email: "",
            Password: "",
            confirmPassword: "",
            FirstName: "",
            LastName: "",
            DateOfBirth: parseDate("1999-10-30")
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formattedBirthDate = formData.DateOfBirth.toString({ calendar: 'gregory', timeZone: getLocalTimeZone() });

        try {
            const resultAction = await dispatch(signup({...formData, DateOfBirth: formattedBirthDate}));

            if (signup.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload || 'Usuario registrado correctamente');
                clearForm();
                window.location.reload();
            } else {
                const errorMsg = resultAction.payload || 'Error en el registro';
                toast.error(errorMsg);
            }
        } catch (error) {
            setErrors({ ...errors, general: error.message });
            toast.error(error.message);
        }
    };

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibilityB = () => setIsVisibleB(!isVisibleB);

    const handleVerifyEmailModal = () => {
        setOpenVerifyEmailModal(true);
    }

    const handleCloseVerifyEmailModal = () => {
        setOpenVerifyEmailModal(false);
    }

    return (
        <> 
            <div className="flex h-full">
                <div className="hidden lg:flex items-center justify-center flex-1 text-black bg-white dark:bg-gray-900">
                    <div className="h-full w-full">
                        <img className="object-cover object-center h-full w-full" src="https://images.pexels.com/photos/804130/pexels-photo-804130.jpeg" alt="Imagen" />
                    </div>
                </div>
                <div className="w-full bg-white dark:bg-zinc-900 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-xl w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black dark:text-white text-center">Registro</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 dark:text-gray-300 text-center">¡Únete al mejor casino online y gana!</h1>
                        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                            <div className="w-full flex gap-4 items-center">
                                <Button className="bg-red-600 text-white w-full mb-2 lg:mb-0" startContent={<FontAwesomeIcon icon={faGoogle} />}>
                                    Iniciar Sesión con Google
                                </Button>    
                                <Button className="bg-blue-600 text-white w-full mb-2 lg:mb-0" startContent={<FontAwesomeIcon icon={faFacebook} />}>
                                    Iniciar Sesión con Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 mb-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                            <p>o usa tu cuenta</p>
                        </div>
                        {errors.general && <div className="text-red-500 text-center mb-4">{errors.general}</div>}
                        <form onSubmit={handleRegister} className="space-y-4">
                            <Input 
                            isRequired 
                            isClearable
                            type="text" 
                            name="Username"
                            label="Username" 
                            placeholder="Ingrese su username" 
                            value={formData.Username}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("Username")}
                            isInvalid={!!errors.Username}
                            errorMessage={errors.Username}
                            />

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="Email"
                            label="Correo"
                            placeholder="Ingrese su correo"
                            value={formData.Email}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("Email")}
                            isInvalid={!!errors.Email}
                            errorMessage={errors.Email}
                            />

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="FirstName"
                            label="Nombre"
                            placeholder="Ingrese su nombre"
                            value={formData.FirstName}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("FirstName")}
                            isInvalid={!!errors.FirstName}
                            errorMessage={errors.FirstName}
                            />

                            <Input 
                            isRequired
                            isClearable
                            type="text"
                            name="LastName"
                            label="Apellido"
                            placeholder="Ingrese su apellido"
                            value={formData.LastName}
                            onChange={handleInputChange}
                            onClear={() => handleClearInputChange("LastName")}
                            isInvalid={!!errors.LastName}
                            errorMessage={errors.LastName}
                            />

                            <DatePicker 
                            isRequired 
                            showMonthAndYearPickers 
                            errorMessage={errors.DateOfBirth}
                            formatOptions={{ year: "numeric", month: "2-digit", day: "2-digit" }} 
                            label="Fecha de Nacimiento" 
                            value={formData.DateOfBirth} 
                            onChange={handleDateChange}
                            isInvalid={!!errors.DateOfBirth}
                            />           
                            
                            <Input 
                            isRequired 
                            name="Password"
                            label="Contraseña" 
                            placeholder="Ingrese su contraseña" 
                            value={formData.Password}
                            onChange={handleInputChange}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg text-default-400 pointer-events-none"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} className="text-lg text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            isInvalid={!!errors.Password}
                            errorMessage={errors.Password}
                            />
                            
                            <Input 
                            isRequired 
                            name="confirmPassword"
                            label="Confirmar Contraseña" 
                            placeholder="Confirme su contraseña" 
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibilityB}>
                                    {isVisibleB ? (
                                        <FontAwesomeIcon icon={faEyeSlash} className="text-lg text-default-400 pointer-events-none"/>
                                    ) : (
                                        <FontAwesomeIcon icon={faEye} className="text-lg text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisibleB ? "text" : "password"}
                            isInvalid={!!errors.confirmPassword}
                            errorMessage={errors.confirmPassword}
                            />

                            <Button 
                            type="submit" 
                            color="primary" 
                            size="lg" 
                            className="w-full" 
                            variant="shadow">
                                Registrate
                            </Button> 
                        </form>
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                            <p>¿Ya tienes una cuenta?
                                <Link isBlock showAnchorIcon href="/login" color="primary" className="ml-1">
                                    Iniciar Sesión
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <VerifyEmailModal 
            open={openVerifyEmailModal} 
            onClose={handleCloseVerifyEmailModal} 
            registerData={registerData} 
            /> */}
        </>
    );
};
  
export default Register;