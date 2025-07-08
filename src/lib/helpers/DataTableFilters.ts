import { FilterFn } from "@tanstack/react-table";

export const dateEquals: FilterFn<any> = (row, columnId, filterValue) => {
  // filterValue viene como Date, o null si se limpió.
  if (!(filterValue instanceof Date)) return true;

  // el valor crudo de la celda: "25/05/25 - 10:00 AM"
  const raw = row.getValue<string>(columnId);
  const [datePart] = raw.split(" - "); // "25/05/25"
  const [d, m, y] = datePart.split("/").map((v) => Number(v));

  // construyes un Date con años full (e.g. “25” → 2025)
  const cellDate = new Date(2000 + y, m - 1, d);

  // comparas solo la fecha (ignorando hora)
  return (
    cellDate.getFullYear() === filterValue.getFullYear() &&
    cellDate.getMonth() === filterValue.getMonth() &&
    cellDate.getDate() === filterValue.getDate()
  );
};
