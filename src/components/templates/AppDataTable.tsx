"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table as AppTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableTypes } from "@/lib/types/types";
import { DataTablePagination } from "./AppDataTablePagination";
import { twMerge } from "tailwind-merge";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  BookOpen,
  Download,
  Plus,
  Rows2,
  Rows3,
  Rows4,
  SlidersHorizontal,
} from "lucide-react";
import { ModalDialog } from "./AppDialog";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { IoSearchSharp } from "react-icons/io5";
import { exportJSONToExcel, getTableJSON } from "@/lib/helpers/ExcelGenerator";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useState } from "react";

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  customFilters,
  sheetname = "data",
}: DataTableTypes.props<TData, TValue>) {
  const [rowSeparator, setRowSeparator] =
    useState<DataTableTypes.SeparatorLevel>("high");

  const table: Table<TData> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const separator: Record<DataTableTypes.SeparatorLevel, string> = {
    low: "h-24",
    mid: "h-18",
    high: "",
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={twMerge(
          "flex py-4 justify-between px-3 bg-[#F7F2FA] dark:bg-[#1D1B20] w-full content-between"
        )}
      >
        <div className="flex gap-3">
          {actions.includes("ADD") && (
            <ModalDialog
              exitButton={true}
              trigger={
                <Button
                  variant="circular_fab_main"
                  size={"icon"}
                  className="ml-auto"
                >
                  <Plus />
                </Button>
              }
            >
              <DialogHeader>
                <DialogTitle>¿Estás seguro?</DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="circular_fab">Confirmar</Button>
              </DialogFooter>
            </ModalDialog>
          )}
          {customFilters?.(table)}
          <Input
            placeholder="Buscar"
            onChange={(event) => {
              // table.getColumn("email")?.setFilterValue(event.target.value)
              table.setGlobalFilter(event.target.value);
            }}
            icon={<IoSearchSharp />}
            className="max-w-sm  border-gray-500"
          />
          {actions.includes("SEPARATOR") && (
            <ToggleGroup
              type="single"
              value={rowSeparator}
              onValueChange={(value: DataTableTypes.SeparatorLevel) => {
                if (value) setRowSeparator(value);
              }}
            >
              <ToggleGroupItem value="low">
                <Rows2 />
              </ToggleGroupItem>
              <ToggleGroupItem value="mid">
                <Rows3 />
              </ToggleGroupItem>
              <ToggleGroupItem value="high">
                <Rows4 />
              </ToggleGroupItem>
            </ToggleGroup>
          )}
          <div className="grid grid-flow-col gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <SlidersHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const headerText =
                      typeof column.columnDef.header === "function"
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-expect-error
                          column.columnDef.header().props.children
                        : column.columnDef.header;

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => {
                          column.toggleVisibility(!!value);
                        }}
                      >
                        {headerText?.toString()}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            {actions.includes("DOWNLOAD") && (
              <Button
                variant="ghost"
                onClick={() => {
                  const jsonData = getTableJSON(table);
                  exportJSONToExcel(jsonData, sheetname);
                }}
              >
                <Download />
              </Button>
            )}
          </div>
        </div>
        <div className="hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <BookOpen />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AppTable className={!table.getRowModel().rows.length ? "h-full" : ""}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={separator[rowSeparator]}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-full text-center"
              >
                Sin resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </AppTable>
      <DataTablePagination table={table} />
    </div>
  );
}
