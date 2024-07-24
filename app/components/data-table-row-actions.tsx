"use client";

import { toast } from "@/components/ui/use-toast";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import axios from "axios";
import { usePromotions } from "../hooks/usePromotions";
import Promotion from "@/lib/models/Promotion";
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<Promotion>) {
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

  const { promotions, isLoading, error, fetchPromotions } = usePromotions();
  console.log("Promotions:", promotions);

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
      fetchPromotions();
    } catch (error) {
      console.error("Failed to update featured status", error);
      toast({
        title: "Failed to update featured status",
        description: "An error occurred while updating the featured status.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

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
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>League Name</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={promotion.leagueName || ""}
              onValueChange={handleLeagueChange}
            >
              {leagues.map((league) => (
                <DropdownMenuRadioItem key={league.value} value={league.value}>
                  {league.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Applicable State</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={promotion.applicableState || ""}
              onValueChange={handleStateChange}
            >
              {states.map((state) => (
                <DropdownMenuRadioItem key={state.value} value={state.value}>
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
                <DropdownMenuRadioItem key={league.value} value={league.value}>
                  {league.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
