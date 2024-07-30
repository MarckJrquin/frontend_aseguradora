import React, {useState, useEffect} from "react";
import { format } from "date-fns";

import QuoteService from "../services/quoteInsurance.service";

import ConfirmDeleteQuote from "./ConfirmDeleteQuote";
import ViewQuoteDetails from "./ViewQuoteDetails"; 

import { Toaster, toast } from "sonner";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Chip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrashCan, } from "@fortawesome/free-solid-svg-icons";

export const columns = [
  { name: "ID", uid: "id" },
  { name: "Marca", uid: "brand" },
  { name: "Modelo", uid: "model" },
  { name: "Año", uid: "year" },
  { name: "Costo", uid: "cost" },
  { name: "Tipo de Seguro", uid: "insuranceType" },
  { name: "Cobertura", uid: "coverage" },
  { name: "Precio Cotizado", uid: "price" },
  { name: "Fecha", uid: "createdAt" },
  { name: "Acciones", uid: "actions" },
];

const statusColorMap = {
  deposit: "success",
  withdrawal: "danger"
};

const QuoteInsuranceTable = () =>  {

    const [quotes, setQuotes] = useState([]);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        async function fetchQuotes() {
          try {
            const quotesData = await QuoteService.getUserQuotes();
            setQuotes(quotesData);
            console.log(quotesData);
          } catch (error) {
            console.error("Error fetching quotes:", error);
          }
        }
    
        fetchQuotes();
    }, []);

    const handleOpenDeleteModal = (quote) => {
      setSelectedQuote(quote);
      setIsDeleteModalOpen(true);
    };

    const handleOpenViewModal = (quote) => {
      setSelectedQuote(quote);
      setIsViewModalOpen(true);
    };

    const handleDelete = async (id) => {
      try {
          await QuoteService.deleteQuote(id);
          setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote.id !== id));
          toast.success("Cotización eliminada exitosamente.");
          setIsModalOpen(false); 
      } catch (error) {
          console.error("Error deleting quote:", error);
          toast.error("Error al eliminar la cotización.");
      }
    };

    
    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey];
    
        switch (columnKey) {
          case "price":
            return <span className="font-semibold">{cellValue}</span>;
          case "createdAt":
            return <span>{format(new Date(cellValue), "dd/MM/yyyy")}</span>;
          default:
            return cellValue;
        }
    }, []);

  return (
    <>
      <Table aria-label="Quotes table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={quotes}>
            {(item) => (
                <TableRow key={item.id}>
                    {(columnKey) => (
                        <TableCell>
                            {columnKey === "actions" ? (
                                <div className="flex gap-2">
                                  <Button
                                    isIconOnly
                                    size="md"
                                    auto
                                    color="primary"
                                    className="w-auto"
                                    onClick={() => handleOpenViewModal(item)}
                                  >
                                    <FontAwesomeIcon icon={faEye} />
                                  </Button>
                                  <Button
                                    isIconOnly
                                    size="md"
                                    auto
                                    color="danger"
                                    className="w-auto"
                                    onClick={() => handleOpenDeleteModal(item)}
                                  >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                  </Button>
                                </div>
                            ) : (
                                renderCell(item, columnKey)
                            )}
                        </TableCell>
                    )}
                </TableRow>
            )}
        </TableBody>
      </Table>

      {selectedQuote && (
        <>
          <ConfirmDeleteQuote
            open={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => handleDelete(selectedQuote.id)}
          />
          <ViewQuoteDetails
            open={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            quote={selectedQuote}
          />
        </>
      )}
    </>
  );
}


export default QuoteInsuranceTable;