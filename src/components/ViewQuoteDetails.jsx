import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const ViewQuote = ({ open, onClose, quote }) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      size="lg"
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader>
          Detalles de la Cotización
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
                        <div className="text-gray-700 dark:text-zinc-200">Fecha: {new Date(quote.createdAt).toLocaleDateString()}</div>
                        <div className="text-gray-700 dark:text-zinc-200">Cotización #: {quote.id}</div>
                    </div>
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
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.brand}</td>
                        </tr>
                        <tr>
                            <td class="text-left text-gray-700 dark:text-zinc-200">Modelo</td>
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.model}</td>
                        </tr>
                        <tr>
                            <td class="text-left text-gray-700 dark:text-zinc-200">Año</td>
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.year}</td>
                        </tr>
                        <tr>
                            <td class="text-left text-gray-700 dark:text-zinc-200">Costo</td>
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.cost}</td>
                        </tr>
                        <tr>
                            <td class="text-left text-gray-700 dark:text-zinc-200">Tipo de seguro</td>
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.insuranceType}</td>
                        </tr>
                        <tr>
                            <td class="text-left text-gray-700 dark:text-zinc-200">Cobertua</td>
                            <td class="text-right text-gray-700 dark:text-zinc-200">{quote.coverage}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="text-left font-bold text-gray-700 dark:text-zinc-200">Precio</td>
                            <td class="text-right font-bold text-gray-700 dark:text-zinc-200">{quote.price}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="text-gray-700 dark:text-zinc-200 mb-2">Gracias por cotizar con nosotros!</div>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewQuote;
