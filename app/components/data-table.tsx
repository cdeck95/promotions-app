"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import React from "react";
import Promotion from "@/lib/models/Promotion";

interface DataTableProps {
  columns: ColumnDef<Promotion>[];
  data: Promotion[];
}

export const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const initialSorting: SortingState = [
    {
      id: "postedDateTime",
      desc: true,
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const [isMobile, setIsMobile] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const maxTableWidth = 1500 > screenWidth ? screenWidth : 1500;
  console.log("maxTableWidth", maxTableWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("Data", data);

  return (
    <div
      className="space-y-4 mr-auto ml-auto"
      style={{ maxWidth: isMobile ? "100%" : maxTableWidth + "px" }}
    >
      <DataTableToolbar searchName={"title"} table={table} />
      <div
        className="rounded-md border w-full m-auto justify-center"
        style={{ maxWidth: isMobile ? "100%" : maxTableWidth + "px" }}
      >
        <Table style={{ maxWidth: isMobile ? "100%" : maxTableWidth + "px" }}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                // add green bg for featured promos
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.original.featured ? "featured" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
};
