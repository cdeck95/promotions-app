"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { useEffect, useState } from "react";
import Promotion from "@/lib/models/Promotion";
import Rush2WagerLogo from "@/public/main_logo_fullsize.png";
import Image from "next/image";
import moment from "moment";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { RotateCounterClockwiseIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { usePromotions } from "@/app/hooks/usePromotions";
import { DataTableColumnHeader } from "@/app/components/data-table-column-header";
import { DataTable } from "@/app/components/data-table";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { promotions, isLoading, fetchPromotions } = usePromotions();

  useEffect(() => {
    if (!promotions && !isLoading) {
      fetchPromotions();
    }
  }, [promotions, isLoading]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  // 1. Calculate the date 72 hours ago from now using moment
  const date72HoursAgo = moment().subtract(72, "hours").toDate();

  //console.log("Date 72 hours ago:", date72HoursAgo);

  const router = useRouter();
  const {
    accessToken,
    getAccessToken,
    isAuthenticated,
    user,
    isLoading: loadingUser,
  } = useKindeBrowserClient();

  const hasPromosAdminRole = accessToken?.roles?.some(
    (role) => role.key === "promos-admin"
  );
  const isReadOnly =
    accessToken?.roles?.some((role) => role.key === "member") &&
    !hasPromosAdminRole;

  const columns: ColumnDef<Promotion>[] = [
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
    // {
    //   accessorKey: "image",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Image" />
    //   ),
    //   cell: (info) => {
    //     const id = info.getValue() as string;
    //     const imageUrl = info.row.getValue("image") as string;
    //     return <Image src={imageUrl} alt={id} width={400} height={400} />;
    //   },
    // },

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

    // {
    //   accessorKey: "code",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Code" />
    //   ),
    //   cell: (info) => {
    //     const code = info.getValue() as string;
    //     const url = info.row.getValue("url") as string;
    //     return (
    //       <a href={url} target="_blank" rel="noopener noreferrer">
    //         {code}
    //       </a>
    //     );
    //   },
    // },

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
              className="overflow-ellipsis overflow-hidden whitespace-nowrap text-[var(--primary-green)] hover:text-dark-green"
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
      cell: (info) => format(new Date(info.getValue() as string), "MM/dd/yyyy"),
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
      accessorKey: "applicableState",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Applicable State" />
      ),
      cell: (info) => {
        const applicableState = info.getValue() as string;
        if (!applicableState) return null;
        return (
          <div className="flex flex-row min-w-fit items-center justify-start gap-2">
            <Badge className="text-sm">{applicableState}</Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const promotion = row.original;
        const leagues = [
          {
            value: "NFL",
            label: "NFL",
          },
          {
            value: "NBA",
            label: "NBA",
          },
          {
            value: "MLB",
            label: "MLB",
          },
          {
            value: "NHL",
            label: "NHL",
          },
          {
            value: "American Major League Soccer",
            label: "MLS",
          },
          {
            value: "PGA Tour",
            label: "PGA Tour",
          },
          {
            value: "LIV Golf",
            label: "LIV Golf",
          },
          {
            value: "WNBA",
            label: "WNBA",
          },
          {
            value: "UFC",
            label: "UFC",
          },
          {
            value: "NASCAR",
            label: "NASCAR",
          },
          {
            value: "NCAAF",
            label: "NCAAF",
          },
          {
            value: "NCAAB",
            label: "NCAAB",
          },
          {
            value: "CFL",
            label: "CFL",
          },
          {
            value: "Tennis",
            label: "Tennis",
          },
          {
            value: "Cricket",
            label: "Cricket",
          },
          {
            value: "Rugby",
            label: "Rugby",
          },
          {
            value: "Boxing",
            label: "Boxing",
          },
          {
            value: "Olympics",
            label: "Olympics",
          },
          {
            value: "Golf",
            label: "Golf",
          },
          {
            value: "Horse Racing",
            label: "Horse Racing",
          },
          {
            value: "Esports",
            label: "Esports",
          },
          {
            value: "Other",
            label: "Other",
          },
        ];

        const states = [
          { value: "", label: "No State" },
          { value: "All", label: "All" },
          { value: "AL", label: "AL" },
          { value: "AK", label: "AK" },
          { value: "AZ", label: "AZ" },
          { value: "AR", label: "AR" },
          { value: "CA", label: "CA" },
          { value: "CO", label: "CO" },
          { value: "CT", label: "CT" },
          { value: "DE", label: "DE" },
          { value: "FL", label: "FL" },
          { value: "GA", label: "GA" },
          { value: "HI", label: "HI" },
          { value: "ID", label: "ID" },
          { value: "IL", label: "IL" },
          { value: "IN", label: "IN" },
          { value: "IA", label: "IA" },
          { value: "KS", label: "KS" },
          { value: "KY", label: "KY" },
          { value: "LA", label: "LA" },
          { value: "ME", label: "ME" },
          { value: "MD", label: "MD" },
          { value: "MA", label: "MA" },
          { value: "MI", label: "MI" },
          { value: "MN", label: "MN" },
          { value: "MS", label: "MS" },
          { value: "MO", label: "MO" },
          { value: "MT", label: "MT" },
          { value: "NE", label: "NE" },
          { value: "NV", label: "NV" },
          { value: "NH", label: "NH" },
          { value: "NJ", label: "NJ" },
          { value: "NM", label: "NM" },
          { value: "NY", label: "NY" },
          { value: "NC", label: "NC" },
          { value: "ND", label: "ND" },
          { value: "OH", label: "OH" },
          { value: "OK", label: "OK" },
          { value: "OR", label: "OR" },
          { value: "PA", label: "PA" },
          { value: "RI", label: "RI" },
          { value: "SC", label: "SC" },
          { value: "SD", label: "SD" },
          { value: "TN", label: "TN" },
          { value: "TX", label: "TX" },
          { value: "UT", label: "UT" },
          { value: "VT", label: "VT" },
          { value: "VA", label: "VA" },
          { value: "WA", label: "WA" },
          { value: "WV", label: "WV" },
          { value: "WI", label: "WI" },
          { value: "WY", label: "WY" },
        ];

        const featuredOptions = [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ];

        const handleLeagueChange = async (newLeague: string) => {
          try {
            await axios.patch(`/api/promotions/${promotion.id}`, {
              leagueName: newLeague,
            });
            toast({
              title: "League updated",
              description: "The league has been updated successfully.",
              variant: "default",
              duration: 3000,
            });
            router.refresh();
            fetchPromotions();
          } catch (error) {
            console.error("Failed to update league", error);
            toast({
              title: "Failed to update league",
              description: "An error occurred while updating the league.",
              variant: "destructive",
              duration: 3000,
            });
          }
        };

        const handleStateChange = async (newState: string) => {
          try {
            await axios.patch(`/api/promotions/${promotion.id}`, {
              applicableState: newState,
            });
            toast({
              title: "State updated",
              description: "The state has been updated successfully.",
              variant: "default",
              duration: 3000,
            });
            router.refresh();
            fetchPromotions();
          } catch (error) {
            console.error("Failed to update state", error);
            toast({
              title: "Failed to update state",
              description: "An error occurred while updating the state.",
              variant: "destructive",
              duration: 3000,
            });
          }
        };

        const handleFeaturedChange = async (newFeatured: string) => {
          try {
            const featured = newFeatured === "Yes" ? true : false;
            await axios.patch(`/api/promotions/${promotion.id}`, {
              featured: featured,
            });
            toast({
              title: "Featured updated",
              description: "The featured status has been updated successfully.",
              variant: "default",
              duration: 3000,
            });
            router.refresh();
            fetchPromotions();
          } catch (error) {
            console.error("Failed to update featured status", error);
            toast({
              title: "Failed to update featured status",
              description:
                "An error occurred while updating the featured status.",
              variant: "destructive",
              duration: 3000,
            });
          }
        };

        return isReadOnly ? null : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>League</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={promotion.leagueName || ""}
                    onValueChange={handleLeagueChange}
                  >
                    {leagues.map((league) => (
                      <DropdownMenuRadioItem
                        key={league.value}
                        value={league.value}
                      >
                        {league.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>State</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={promotion.applicableState || ""}
                    onValueChange={handleStateChange}
                  >
                    {states.map((state) => (
                      <DropdownMenuRadioItem
                        key={state.value}
                        value={state.value}
                      >
                        {state.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Featured</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={promotion.featured ? "Yes" : "No"}
                    onValueChange={handleFeaturedChange}
                  >
                    {featuredOptions.map((league) => (
                      <DropdownMenuRadioItem
                        key={league.value}
                        value={league.value}
                      >
                        {league.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isAuthenticated && !hasPromosAdminRole && !loadingUser && !isReadOnly) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="grid gridcol-1 min-h-screen w-full items-start p-4 lg:p-8 gap-4">
      <div className="grid grid-cols-1 gap-8 w-full ml-auto mr-auto">
        <DataTable
          columns={columns}
          data={promotions}
          loading={isLoading}
          isReadOnly={isReadOnly}
        />
      </div>
    </div>
  );
}
