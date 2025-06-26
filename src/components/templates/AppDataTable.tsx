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
import { Separator } from "../ui/separator";
import { IoSearchSharp } from "react-icons/io5";

export function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  customFilters,
}: DataTableTypes.props<TData, TValue>) {
  const table: Table<TData> = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

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
            value={table.getColumn("email")?.getFilterValue() as string}
            onChange={(event) => {
              // table.getColumn("email")?.setFilterValue(event.target.value)
              table.setGlobalFilter(event.target.value);
            }}
            icon={<IoSearchSharp />}
            className="max-w-sm  border-gray-500"
          />
          {/* <Separator orientation="vertical" className="mx-1" /> */}
          {/* <Button variant="ghost">
            <Rows2 />
          </Button>
          <Button variant="ghost">
            <Rows3 />
          </Button>
          <Button variant="ghost">
            <Rows4 />
          </Button> */}
          {/* <Separator orientation="vertical" className="mx-1" /> */}
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
              <Button variant="ghost">
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
