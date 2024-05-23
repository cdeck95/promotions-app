"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Promotion {
  id: number;
  platform: string;
  code: string;
  title: string;
  description: string;
  url: string;
  image: string;
  datetime: Date;
  leagueName: string;
}

export const columnHeadersArrayPromotions: { [key: string]: string } = {
  id: "ID",
  platform: "Platform",
  code: "Code",
  title: "Title",
  description: "Description",
  url: "URL",
  image: "Image",
  datetime: "Date",
  leagueName: "League",
};

export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: (info) => {
      const id = info.getValue() as string;
      const imageUrl = info.row.getValue("image") as string;
      return (
        <div>
          {id.toString()}
          {/* <Image src={imageUrl} alt={id} width={400} height={400} /> */}
        </div>
      );
    },
  },
  {
    accessorKey: "leagueName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="League" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "platform",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: (info) => {
      const id = info.getValue() as string;
      const imageUrl = info.row.getValue("image") as string;
      return <Image src={imageUrl} alt={id} width={400} height={400} />;
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },

  {
    accessorKey: "datetime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const promotion = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(promotion.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
