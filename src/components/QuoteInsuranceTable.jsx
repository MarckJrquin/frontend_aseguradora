import React, {useState, useEffect} from "react";
import { format } from "date-fns";

import QuoteService from "../services/quoteInsurance.service";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, } from "@fortawesome/free-solid-svg-icons";

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
];

const statusColorMap = {
  deposit: "success",
  withdrawal: "danger"
};

const QuoteInsuranceTable = () =>  {

    const [quotes, setQuotes] = useState([]);

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


    const renderCell = React.useCallback((data, columnKey) => {
        const cellValue = data[columnKey];
    
        switch (columnKey) {
          case "price":
            return <span className="font-semibold">${cellValue}</span>;
          case "createdAt":
            return <span>{format(new Date(cellValue), "dd/MM/yyyy")}</span>;
          default:
            return cellValue;
        }
    }, []);

  return (
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
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


export default QuoteInsuranceTable;