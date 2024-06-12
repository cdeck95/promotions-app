"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableViewOptions from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { columnHeadersArrayPromotions } from "./columns";
import { useMemo } from "react";

interface DataTableToolbarProps<TData> {
  searchName: string;
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  searchName,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Assuming `tableData` is the data fed into the table
  const uniquePlatforms = useMemo(() => {
    const values = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("platform")) as string[];
    console.log("values", values);
    return Array.from(new Set(values));
  }, [table]);

  console.log("uniquePlatforms", uniquePlatforms);

  // Convert the Set to an array and map it to the format needed for the options
  const platformOptions = Array.from(uniquePlatforms).map((platform) => ({
    value: platform,
    label: platform,
  }));

  console.log("leagueOptions", platformOptions);

  // Assuming `tableData` is the data fed into the table
  const uniqueLeagues = useMemo(() => {
    const values = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("leagueName")) as string[];
    return Array.from(new Set(values));
  }, [table]);

  console.log("uniqueLeagues", uniqueLeagues);

  // Convert the Set to an array and map it to the format needed for the options
  const leagueOptions = Array.from(uniqueLeagues).map((league) => ({
    value: league,
    label: league,
  }));

  console.log("leagueOptions", leagueOptions);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by title..."
          value={
            (table.getColumn(searchName)?.getFilterValue() as string) ?? ""
          }
          onChange={(event: { target: { value: any } }) =>
            table.getColumn(searchName)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("platform") && (
          <DataTableFacetedFilter
            column={table.getColumn("platform")}
            title="Platform"
            options={platformOptions}
          />
        )}
        {table.getColumn("leagueName") && (
          <DataTableFacetedFilter
            column={table.getColumn("leagueName")}
            title="League"
            options={leagueOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions
        table={table}
        columnHeaders={columnHeadersArrayPromotions}
      />
    </div>
  );
}
