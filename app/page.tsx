"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useEffect, useState } from "react";
import Promotion from "@/lib/models/Promotion";

export default function Home() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchPromotions() {
    try {
      setLoading(true);
      const response = await fetch("/api/promotions");
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

  return (
    <main className="flex flex-col min-h-screen w-full items-start justify-center p-8 gap-4">
      <ModeToggle />
      {!loading && <DataTable columns={columns} data={promotions} />}
    </main>
  );
}
