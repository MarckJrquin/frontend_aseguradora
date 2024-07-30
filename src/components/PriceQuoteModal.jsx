import React, { useState, useEffect, useRef }  from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getProfileData } from "../store/slices/user";
import QuoteService from '../services/quoteInsurance.service';

import { toast } from 'sonner';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button,  Card, Input, DatePicker} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

const PriceQuoteModal = ( props ) => {

    const { open, onClose, quoteInsuranceData } = props;

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        toast.error("Debe iniciar sesión para acceder a esta página.");
        return <Navigate to="/login" />;
    }

    console.log(quoteInsuranceData);

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
                    <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg mt-1 shadow-lg p-5">
                        <h1 class="font-bold text-2xl my-4 text-center text-indigo-500">
                            Aseguradora
                        </h1>
                        <hr class="mb-2"/>
                        <div class="flex justify-between mb-6">
                            <h1 class="text-lg font-bold">Cotización</h1>
                            <div class="text-gray-700">
                                <div className="text-gray-700 dark:text-zinc-200">Fecha: {quoteInsuranceData.date}</div>
                                <div className="text-gray-700 dark:text-zinc-200">Cotización #: {quoteInsuranceData.quoteId}</div>
                            </div>
                        </div>
                        <div class="mb-8">
                            <h2 class="text-lg font-bold mb-4">Información:</h2>
                            <div class="text-gray-700 dark:text-zinc-200 mb-2">{quoteInsuranceData.user.firstName} {quoteInsuranceData.user.lastName}</div>
                            <div class="text-gray-700 dark:text-zinc-200 mb-2">{quoteInsuranceData.user.email}</div>
                            <div class="text-gray-700 dark:text-zinc-200 mb-2">@{quoteInsuranceData.user.username}</div>
                        </div>
                        <table class="w-full mb-8">
                            <thead>
                                <tr>
                                    <th class="text-left font-bold text-gray-700 dark:text-zinc-200">Descripción</th>
                                    <th class="text-right font-bold text-gray-700 dark:text-zinc-200">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Marca</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">{quoteInsuranceData.car.brand}</td>
                                </tr>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Modelo</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">{quoteInsuranceData.car.model}</td>
                                </tr>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Año</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">{quoteInsuranceData.car.year}</td>
                                </tr>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Costo</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">B/.{quoteInsuranceData.car.cost}</td>
                                </tr>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Tipo de seguro</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">{quoteInsuranceData.insuranceType.name}</td>
                                </tr>
                                <tr>
                                    <td class="text-left text-gray-700 dark:text-zinc-200">Cobertua</td>
                                    <td class="text-right text-gray-700 dark:text-zinc-200">{quoteInsuranceData.coverage.name}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td class="text-left font-bold text-gray-700 dark:text-zinc-200">Precio</td>
                                    <td class="text-right font-bold text-gray-700 dark:text-zinc-200">{quoteInsuranceData.price}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="text-gray-700 dark:text-zinc-200 mb-2">Gracias por cotizar con nosotros!</div>
                    </div>
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