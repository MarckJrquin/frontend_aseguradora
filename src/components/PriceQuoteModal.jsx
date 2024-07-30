import React, { useState, useEffect, useRef }  from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getProfileData } from "../store/slices/user";
import QuoteService from '../services/quoteInsurance.service';

import { toast } from 'sonner';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, DatePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

const PriceQuoteModal = ( props ) => {

    const { open, onClose, quoteInsuranceData } = props;

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        toast.error("Debe iniciar sesión para acceder a esta página.");
        return <Navigate to="/login" />;
    }

    const handleSubmit = async () => {
        try {
            if (!quoteInsuranceData || !quoteInsuranceData.car || !quoteInsuranceData.insuranceType || !quoteInsuranceData.coverage) {
                throw new Error("Datos incompletos de la cotización");
            }

            const saveQuoteInsuranceData = {
                Model: quoteInsuranceData.car.model,
                Brand: quoteInsuranceData.car.brand,
                Cost: quoteInsuranceData.car.cost,
                Year: quoteInsuranceData.car.year,
                InsuranceTypeId: quoteInsuranceData.insuranceType.id,
                CoverageId: quoteInsuranceData.coverage.id,
            };

            const response = await QuoteService.saveQuote(saveQuoteInsuranceData);
            toast.success(response.message || 'Cotización guardada exitosamente');
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <Modal 
            isOpen={open} 
            onClose={onClose}
            size='xl'
            placement='auto'
            scrollBehavior='inside'
            backdrop='blur'
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    Cotización de Seguro
                </ModalHeader>
                <ModalBody>
                    <p><strong>Marca:</strong> {quoteInsuranceData.car.brand}</p>
                    <p><strong>Modelo:</strong> {quoteInsuranceData.car.model}</p>
                    <p><strong>Costo:</strong> ${quoteInsuranceData.car.cost}</p>
                    <p><strong>Año:</strong> {quoteInsuranceData.car.year}</p>
                    <p><strong>Tipo de Seguro:</strong> {quoteInsuranceData.insuranceType.name}</p>
                    <p><strong>Cobertura:</strong> {quoteInsuranceData.coverage.name}</p>
                    <p><strong>Precio Calculado:</strong> ${quoteInsuranceData.price.toFixed(2)}</p>
                    <p><strong>Usuario:</strong> {quoteInsuranceData.user.firstName} {quoteInsuranceData.user.lastName}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                        Guardar Cotización
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    );
};

export default PriceQuoteModal;