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
import Promotion from "@/lib/models/Promotion";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const columnHeadersArrayPromotions: { [key: string]: string } = {
  id: "ID",
  platform: "Platform",
  code: "Code",
  title: "Title",
  description: "Description",
  url: "URL",
  image: "Image",
  postedDateTime: "Posted Date",
  leagueName: "League",
  featured: "Featured",
};

export const columns: ColumnDef<Promotion>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  //   cell: (info) => {
  //     const id = info.getValue() as string;
  //     const imageUrl = info.row.getValue("image") as string;
  //     return (
  //       <div>
  //         {id.toString()}
  //         {/* <Image src={imageUrl} alt={id} width={400} height={400} /> */}
  //       </div>
  //     );
  //   },
  // },
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Title"
        className="min-w-[200px]"
      />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Description"
        className="min-w-[250px]"
      />
    ),
    cell: (info) => {
      return (
        <div className="flex flex-row min-w-fit items-center justify-start gap-2">
          {/* <Label className="text-sm min-w-fit text-ellipsis"> */}
          {info.getValue() as string}
          {/* </Label> */}
        </div>
      );
    },
  },
  {
    accessorKey: "leagueName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="League" />
    ),
    cell: (info) => {
      const leagueName = info.getValue() as string;
      if (!leagueName) return null;
      return (
        <div className="flex flex-row min-w-fit items-center justify-start gap-2">
          <Badge className="text-sm">{leagueName}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: (info) => {
      const code = info.getValue() as string;
      const url = info.row.getValue("url") as string;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {code}
        </a>
      );
    },
  },

  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="URL"
        className="max-w-[150px]"
      />
    ),
    cell: (info) => {
      const url = info.getValue() as string;
      return (
        <div className="flex flex-row max-w-[150px] items-center justify-start gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="overflow-ellipsis overflow-hidden whitespace-nowrap"
          >
            <strong>Click Here</strong>
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "postedDateTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posted Date" />
    ),
    cell: (info) => (info.getValue() as string).toString(),
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: (info) => {
      const featured = info.getValue() as boolean;
      return (
        <div className="flex flex-row min-w-fit items-center justify-start gap-2">
          {featured ? <Badge className="text-sm">Featured</Badge> : null}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
