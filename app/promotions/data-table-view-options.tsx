"use client";

import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  columnHeaders: { [key: string]: string };
}

export function DataTableViewOptions<TData>({
  table,
  columnHeaders,
}: DataTableViewOptionsProps<TData>) {
  useEffect(() => {
    table.getAllColumns().forEach((column) => {
      const visibility = Cookies.get(`column-${column.id}-visibility`);
      if (visibility !== undefined) {
        column.toggleVisibility(visibility === "true");
      }
    });
  }, [table]);

  const resetToDefault = () => {
    table.getAllColumns().forEach((column) => {
      Cookies.remove(`column-${column.id}-visibility`);
      column.toggleVisibility(true);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 lg:flex">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                  Cookies.set(`column-${column.id}-visibility`, String(value));
                }}
              >
                {columnHeaders[column.id]}
              </DropdownMenuCheckboxItem>
            );
          })}
        <DropdownMenuSeparator />
        <DropdownMenuLabel
          onClick={resetToDefault}
          className="capitalize text-sm cursor-pointer"
        >
          Reset to default
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataTableViewOptions;
