import React, { useState, useEffect, useRef }  from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getProfileData } from "../../store/slices/user";
import QuoteService from '../../services/quoteInsurance.service';

import PriceQuoteModal from "../../components/PriceQuoteModal";

import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLock, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Button, Input, RadioGroup, Radio } from '@nextui-org/react';
import {parseDate} from "@internationalized/date";

const QuoteInsurance = () => {
  const [formData, setFormData] = useState({
    Brand: "",
    Model: "",
    Cost: "",
    Year: 2024,
    InsuranceTypeId: 1,
    CoverageId: 1,
  });

  const [preliminaryQuote, setPreliminaryQuotel] = useState({});

  const [openPriceQuoteModal, setOpenPriceQuoteModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [coverages, setCoverages] = useState([]);

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

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const insuranceTypesData = await QuoteService.getInsuranceTypes();
        setInsuranceTypes(insuranceTypesData);
        const coveragesData = await QuoteService.getCoverages();
        setCoverages(coveragesData);
      } catch (error) {
        toast.error("Error fetching insurance data.");
      }
    };

    fetchInsuranceData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleClearInputChange = (name) => {
    setFormData({ ...formData, [name]: '' });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    // Patrón para validar el formato del año (solo años entre 1900 y el año actual)
    const yearPattern = /^(19|20)\d{2}$/;
    const currentYear = new Date().getFullYear();

    // Patrón para validar el formato del costo (número positivo con hasta 2 decimales)
    const costPattern = /^[0-9]+(\.[0-9]{1,2})?$/;

    // Validaciones
    if (!formData.Brand) newErrors.Brand = "La marca del auto es requerida";
    if (!formData.Model) newErrors.Model = "El modelo del auto es requerido";
    
    if (!formData.Cost) {
      newErrors.Cost = "El costo del auto es requerido";
    } else if (formData.Cost < 0 || !costPattern.test(formData.Cost)) {
      newErrors.Cost = "El costo debe ser un número positivo con hasta dos decimales";
    }

    if (!formData.Year) {
      newErrors.Year = "El año de fabricación del auto es requerido";
    } else if (!yearPattern.test(formData.Year)) {
      newErrors.Year = "El año de fabricación debe ser un año válido (por ejemplo, 2024)";
    } else if (formData.Year > currentYear) {
      newErrors.Year = "El año de fabricación no puede ser mayor al año actual";
    } else if (formData.Year < 1900) {
      newErrors.Year = "El año de fabricación no puede ser menor a 1900";
    }

    if (!formData.InsuranceTypeId) newErrors.InsuranceTypeId = "El tipo de seguro es requerido";
    if (!formData.CoverageId) newErrors.CoverageId = "La cobertura es requerida";

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
  };

  const clearForm = () => {
    setFormData({
      Brand: "",
      Model: "",
      Cost: "",
      Year: 0,
      InsuranceTypeId: 1,
      CoverageId: 1,
    });
  };

  const handleOpenPriceQuoteModal = () => {
    setOpenPriceQuoteModal(true);
  };

  const handleClosePriceQuoteModal = () => {
    setOpenPriceQuoteModal(false);
  };

  const handleQuoteInsurance = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const quote = await QuoteService.createQuote(formData);
      setPreliminaryQuotel(quote);
      handleOpenPriceQuoteModal();
      toast.success("Cotización creada exitosamente.");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (!profileData) {
    return <p className="text-center text-gray-500 dark:text-gray-300">Cargando perfil...</p>;
  }

  return (
    <>
    <section class="py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 grid-cols-1">
            <div class="lg:mb-0 mb-10">
                <div class="group w-full h-full">
                    <div class="relative h-full">
                        <img src="https://pagedone.io/asset/uploads/1696488602.png" alt="ContactUs tailwind section" class="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-700"/>
                        <h1 class="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Para mas información</h1>
                        <div class="absolute bottom-0 w-full lg:p-11 p-5">
                            <div class="bg-white rounded-lg p-6 block">
                                <a href="javascript:;" class="flex items-center mb-6">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <h5 class="text-black text-base font-normal leading-6 ml-5">+507 277-6435</h5>
                                </a>
                                <a href="javascript:;" class="flex items-center mb-6">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    <h5 class="text-black text-base font-normal leading-6 ml-5">aseguradora@aseguradora.com</h5>
                                </a>
                                <a href="javascript:;" class="flex items-center">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z" stroke="#4F46E5" stroke-width="2"/>
                                        <path d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z" stroke="#4F46E5" stroke-width="2"/>
                                    </svg>
                                    <h5 class="text-black text-base font-normal leading-6 ml-5">Panamá, Panamá, Juan Diaz</h5>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-3 bg-zinc-50 dark:bg-zinc-900 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
              <form onSubmit={handleQuoteInsurance} className="flex flex-col gap-3 ">
                <h2 class="text-indigo-600 dark:text-indigo-400 font-manrope text-4xl font-semibold leading-10 mb-11">Cotización</h2>
                <Input 
                isRequired 
                isClearable
                size="lg" 
                type="text" 
                name="Brand"
                label="Marca de Auto" 
                labelPlacement="outside" 
                placeholder="ingrese la marca del auto"
                value={formData.Brand}
                onChange={handleInputChange}
                onClear={() => handleClearInputChange("Brand")}
                isInvalid={!!errors.Brand}
                errorMessage={errors.Brand}
                />

                <Input 
                isRequired 
                isClearable
                size="lg" 
                type="text" 
                name="Model"
                label="Modelo de Auto" 
                labelPlacement="outside" 
                placeholder="ingrese el modelo del auto"
                value={formData.Model}
                onChange={handleInputChange}
                onClear={() => handleClearInputChange("Model")}
                isInvalid={!!errors.Model}
                errorMessage={errors.Model}
                />

                <Input 
                isRequired 
                isClearable
                size="lg" 
                type="number" 
                name="Year"
                label="Año de fabricación" 
                labelPlacement="outside" 
                placeholder="ingrese el año de fabricación del auto"
                value={formData.Year}
                onChange={handleInputChange}
                onClear={() => handleClearInputChange("Year")}
                isInvalid={!!errors.Year}
                errorMessage={errors.Year}
                />

                <Input 
                isRequired 
                isClearable
                size="lg" 
                type="number" 
                name="Cost"
                label="Costo" 
                labelPlacement="outside" 
                placeholder="ingrese el costo del auto"
                value={formData.Cost}
                onChange={handleInputChange}
                onClear={() => handleClearInputChange("Cost")}
                isInvalid={!!errors.Cost}
                />

                <RadioGroup 
                label="Tipo de Seguro" 
                labelPlacement="outside" 
                description="Seleccionar tipo de seguro"
                name="InsuranceTypeId"
                defaultValue={1}
                onValueChange={(value) => setFormData({ ...formData, InsuranceTypeId: value })}
                >
                  {insuranceTypes.map((insurance) => (
                    <Radio value={insurance.id}>
                      {insurance.name}
                  </Radio>
                  ))}
                </RadioGroup>

                <RadioGroup 
                label="Cobertura" 
                labelPlacement="outside" 
                description="Seleccionar cobertura" 
                name="CoverageId"
                defaultValue={1}
                onValueChange={(value) => setFormData({ ...formData, CoverageId: value })}
                >
                  {coverages.map((coverage) => (
                    <Radio value={coverage.id}>
                      {coverage.name}
                  </Radio>
                  ))}
                </RadioGroup>
                <Button type="submit"  size="lg" color="primary" variant="shadow" >Generar Cotización</Button>
              </form >
            </div>
        </div>
      </div>
    </section>    

    <PriceQuoteModal
      open={openPriceQuoteModal} 
      onClose={handleClosePriceQuoteModal}
      quoteInsuranceData={preliminaryQuote}
    />                                  
    </>
  );
};

export default QuoteInsurance;