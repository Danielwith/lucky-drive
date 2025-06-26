import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Table } from "@tanstack/react-table";
import { getPeruTimestamp } from "../utils";

export function exportJSONToExcel(
  data: Record<string, any>[],
  fileName = "data"
) {
  const sheetname = `${fileName}_${getPeruTimestamp()}.xlsx`;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, sheetname);
}

export function getTableJSON<T>(
  table: Table<T>,
  onlyVisible = true
): Record<string, any>[] {
  const rows = table.getRowModel().rows;
  const allCells = rows.flatMap((row) =>
    onlyVisible ? row.getVisibleCells() : row.getAllCells()
  );

  const columnIdToValues = new Map<string, any[]>();

  allCells.forEach((cell) => {
    const columnId = cell.column.id;
    const existing = columnIdToValues.get(columnId) ?? [];
    existing.push(cell.getValue());
    columnIdToValues.set(columnId, existing);
  });

  const columnsWithOnlyUndefined = new Set<string>();
  columnIdToValues.forEach((values, columnId) => {
    if (values.every((v) => v === undefined)) {
      columnsWithOnlyUndefined.add(columnId);
    }
  });

  return rows.map((row) => {
    const rowData: Record<string, any> = {};
    const cells = onlyVisible ? row.getVisibleCells() : row.getAllCells();

    cells.forEach((cell) => {
      const column = cell.column;
      const columnId = column.id;

      // Nos aseguramos que no existan columnas vacias
      if (columnsWithOnlyUndefined.has(columnId)) return;

      const header = column.columnDef.header;
      const headerLabel = typeof header === "string" ? header : columnId;

      rowData[headerLabel] = cell.getValue();
    });

    return rowData;
  });
}
