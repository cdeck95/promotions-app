"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import Promotion from "@/lib/models/Promotion";
import Rush2WagerLogo from "@/public/main_logo_fullsize.png";
import Image from "next/image";
import moment from "moment";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPromotions() {
    try {
      setLoading(true);
      const response = await fetch("/api/promotions", {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-store'
        }
      });
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      const data: Promotion[] = await response.json();
      setPromotions(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch promotions", error);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchPromotions();
  }, []);

  // 1. Calculate the date 72 hours ago from now using moment
  const date72HoursAgo = moment().subtract(72, "hours").toDate();

  console.log("Date 72 hours ago:", date72HoursAgo);

  return (
    <div className="grid gridcol-1 min-h-screen w-full items-start p-8 gap-4">
      {/* <Image
        src={Rush2WagerLogo}
        alt="Logo"
        width={300}
        height={300}
        className="flex justify-center items-center m-auto"
      /> */}
      {!loading && (
        <div className="grid grid-cols-1 gap-8 w-full ml-auto mr-auto">
          {/* <Label>Date 72 hours ago: {date72HoursAgo.toDateString()}</Label> */}
          <DataTable columns={columns} data={promotions} />
        </div>
      )}
    </div>
  );
}
