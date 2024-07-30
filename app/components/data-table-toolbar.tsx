"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTableViewOptions from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { columnHeadersArrayPromotions } from "./columns";
import { useMemo } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import React from "react";
import { stat } from "fs";

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
    //console.log("values", values);
    return Array.from(new Set(values)).filter((value) => value !== null);
  }, [table]);

  console.log("uniquePlatforms", uniquePlatforms);

  // Convert the Set to an array and map it to the format needed for the options
  const platformOptions = Array.from(uniquePlatforms).map((platform) => ({
    value: platform,
    label: platform,
  }));

  console.log("platformOptions", platformOptions);

  // Assuming `tableData` is the data fed into the table
  const uniqueLeagues = useMemo(() => {
    const values = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("leagueName")) as string[];
    return Array.from(new Set(values)).filter((value) => value !== null);
  }, [table]);

  console.log("uniqueLeagues", uniqueLeagues);

  // Convert the Set to an array and map it to the format needed for the options
  const leagueOptions = Array.from(uniqueLeagues).map((league) => ({
    value: league,
    label: league,
  }));

  console.log("leagueOptions", leagueOptions);

  const uniqueStates = useMemo(() => {
    const values = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue("applicableState")) as string[];
    return Array.from(new Set(values)).filter((value) => value !== null);
  }, [table]);

  console.log("uniqueStates", uniqueStates);

  // Convert the Set to an array and map it to the format needed for the options
  const stateOptions = uniqueStates.map((state) => ({
    value: state,
    label: state,
  }));

  console.log("stateOptions", stateOptions);

  const [isMobile, setIsMobile] = React.useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-1 flex-col lg:flex-row lg:w-full justify-start items-start space-x-2 gap-4 w-full">
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
        <div className="flex flex-col gap-1 !ml-0">
          <div className="flex flex-row gap-1 w-full !ml-0">
            {table.getColumn("platform") && platformOptions.length > 0 && (
              <DataTableFacetedFilter
                column={table.getColumn("platform")}
                title="Platform"
                options={platformOptions}
              />
            )}
            {table.getColumn("leagueName") && leagueOptions.length > 0 && (
              <DataTableFacetedFilter
                column={table.getColumn("leagueName")}
                title="League"
                options={leagueOptions}
              />
            )}
            {table.getColumn("applicableState") && stateOptions.length > 0 && (
              <div className="hidden lg:flex">
                <DataTableFacetedFilter
                  column={table.getColumn("applicableState")}
                  title="State"
                  options={stateOptions}
                />
              </div>
            )}
          </div>
          {table.getColumn("applicableState") && (
            <div className="lg:hidden">
              <DataTableFacetedFilter
                column={table.getColumn("applicableState")}
                title="State"
                options={stateOptions}
              />
            </div>
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
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions
          table={table}
          columnHeaders={columnHeadersArrayPromotions}
        />
      </div>
    </div>
  );
}
