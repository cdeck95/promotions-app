"use client";

import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Promotion from "@/lib/models/Promotion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudUpload, FileImage, Rabbit } from "lucide-react";
import Image from "next/image";
import FanduelLogo from "@/public/assets/fanduel.png";
import DraftkingsLogo from "@/public/assets/draftkings.png";
import ESPNBetLogo from "@/public/assets/ESPN Bet.svg";
import { DatePickerWithPresets } from "../components/date-picker-with-presets";
import { addDays } from "date-fns";

function AddPromo() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date();
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

  const [error, setError] = useState<string | null>(null);

  const [promotion, setPromotion] = useState({
    id: -1,
    platform: "",
    code: "",
    title: "",
    description: "",
    url: "",
    image: "",
    leagueName: "",
    postedDateTime: today,
    expiryDate: addDays(today, 1),
    featured: false,
    applicableState: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Your promotion has been added successfully.",
      variant: "default",
      duration: 3000,
    });
    resetForm();
  };

  const OpenDrawer = () => {
    setDrawerOpen(true);
  };

  const resetForm = () => {
    setPromotion({
      id: -1,
      platform: "",
      code: "",
      title: "",
      description: "",
      url: "",
      image: "",
      leagueName: "",
      postedDateTime: today,
      expiryDate: addDays(today, 1),
      featured: false,
      applicableState: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setDrawerOpen(false);
  };

  const validateDates = (
    startDate: Date | undefined,
    expiryDate: Date | undefined
  ) => {
    if (startDate && expiryDate && startDate > expiryDate) {
      setError("Start date cannot be on or after the expiry date.");
    } else {
      setError(null);
    }
  };

  const handleStartDateChange = (date: Date) => {
    setPromotion({ ...promotion, postedDateTime: date });
    validateDates(date, promotion.expiryDate);
  };

  const handleExpiryDateChange = (date: Date) => {
    setPromotion({ ...promotion, expiryDate: date });
    validateDates(promotion.postedDateTime, date);
  };

  return (
    <div className="grid grid-col-1 p-2 lg:p-6 gap-4 h-full w-full items-start">
      <div className="text-2xl font-bold text-left pb-2 my-0 bg-gradient-custom">
        Add Promotion
      </div>
      <main className="grid flex-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col items-start gap-8 md:flex">
          <form
            className="grid w-full items-start gap-6"
            onSubmit={handleSubmit}
          >
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Basic Info
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="name">Platform</Label>
                <Select
                  onValueChange={(value) =>
                    setPromotion({ ...promotion, platform: value })
                  }
                >
                  <SelectTrigger className="items-start [&_[data-description]]:hidden">
                    <SelectValue placeholder="Select Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fanduel">
                      <div className="flex items-center justify-center gap-3 text-muted-foreground w-full">
                        <Image
                          src={FanduelLogo}
                          width={20}
                          height={20}
                          alt="Fanduel Sportsbook Logo"
                        />
                        <div className="grid gap-0.5">
                          <p>
                            <span className="font-medium text-foreground">
                              Fanduel
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Fanduel Sportsbook & Casino
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="Draftkings">
                      <div className="flex items-center justify-center gap-3 text-muted-foreground w-full">
                        <Image
                          src={DraftkingsLogo}
                          width={20}
                          height={20}
                          alt="Draftkings Sportsbook Logo"
                        />
                        <div className="grid gap-0.5">
                          <p>
                            <span className="font-medium text-foreground">
                              Draftkings
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Draftkings Sportsbook
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="ESPN Bet">
                      <div className="flex items-center justify-center gap-3 text-muted-foreground w-full">
                        <Image
                          src={ESPNBetLogo}
                          width={20}
                          height={20}
                          alt="ESPN Bet Logo"
                        />
                        <div className="grid gap-0.5">
                          <p>
                            <span className="font-medium text-foreground">
                              ESPN Bet
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            ESPN Bet - The official sportsbook of ESPN
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="Title"
                  value={promotion.title}
                  onChange={(e) =>
                    setPromotion({ ...promotion, title: e.target.value })
                  }
                  placeholder="i.e., $1000 Risk-Free Bet"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Description</Label>
                <Textarea
                  id="description"
                  name="Description"
                  value={promotion.description}
                  onChange={(e) =>
                    setPromotion({ ...promotion, description: e.target.value })
                  }
                  placeholder="i.e., Get a $1000 risk-free bet when you sign up and deposit $10 or more. Terms and conditions apply."
                  className="min-h-[9.5rem]"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Code</Label>
                <Input
                  id="code"
                  name="Code"
                  value={promotion.code}
                  onChange={(e) =>
                    setPromotion({ ...promotion, code: e.target.value })
                  }
                  placeholder="i.e., BET1000"
                />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Promo Details
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="brand">Start Date</Label>
                <DatePickerWithPresets
                  value={promotion.postedDateTime}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="brand">End Date</Label>
                <DatePickerWithPresets
                  value={promotion.expiryDate}
                  onChange={handleExpiryDateChange}
                />
                {error && (
                  <Label className="text-red-800 text-sm">{error}</Label>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="color">URL</Label>
                <Input
                  id="url"
                  name="URL"
                  value={promotion.url}
                  onChange={(e) =>
                    setPromotion({ ...promotion, url: e.target.value })
                  }
                  placeholder="The URL to the promotion"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bin">League Name</Label>
                <Select
                  onValueChange={(value) =>
                    setPromotion({ ...promotion, leagueName: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select League" />
                  </SelectTrigger>
                  <SelectContent>
                    {leagues.map((league) => (
                      <SelectItem key={league.value} value={league.value}>
                        {league.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 gap-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
            Photo Upload
          </Badge>
          <div className="flex-1 mt-8 max-h-[600px]">
            {promotion.image ? (
              <Image
                src={promotion.image}
                alt="Promotion Image"
                width={256}
                height={256}
                className="h-full object-contain rounded-lg"
              />
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col cursor-pointer gap-4 items-center justify-center w-full h-full bg-background border border-muted/50 rounded-lg"
              >
                <CloudUpload size={64} />
                <Label className="text-muted-foreground cursor-pointer">
                  Click to upload an image
                </Label>
              </div>
            )}
          </div>
          <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="photo" className="sr-only">
              Photo
            </Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setPromotion({
                      ...promotion,
                      image: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="border-0 p-2 pt-2 cursor-pointer focus-visible:ring-0"
            />
            <div className="flex items-center gap-3 mt-2">
              <Checkbox
                id="featured"
                name="featured"
                checked={promotion.featured}
                className="mt-0 ml-3"
                onCheckedChange={(checked) =>
                  setPromotion({ ...promotion, featured: Boolean(checked) })
                }
              />
              <Label htmlFor="textUser" className="text-sm">
                Featured Promotion?
              </Label>
            </div>
            <Button
              type="button"
              onClick={OpenDrawer}
              size="sm"
              className="mt-3 m-3"
            >
              Submit
            </Button>
          </form>
        </div>
      </main>
      {isDrawerOpen && (
        <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Confirm Promotion Info</h2>
              <div className="grid gap-4">
                <div className="flex">
                  {promotion.image && (
                    <div className="mr-4">
                      <Image
                        src={promotion.image}
                        alt="Promotion Image"
                        width={144}
                        height={144}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Platform:</span>
                      <span>{promotion.platform}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Title:</span>
                      <span>{promotion.title}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Description:</span>
                      <span>{promotion.description}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Code:</span>
                      <span>{promotion.code}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Start Date:</span>
                      <span>{promotion.postedDateTime.toDateString()}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">End Date:</span>
                      <span>{promotion.expiryDate.toDateString()}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">URL:</span>
                      <span>{promotion.url}</span>
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {promotion.leagueName}
                    </Badge>
                    {promotion.applicableState && (
                      <Badge variant="outline" className="mt-2">
                        {promotion.applicableState}
                      </Badge>
                    )}
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">League Name:</span>
                      <span>{promotion.leagueName}</span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold">Featured:</span>
                      <span>{promotion.featured ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button type="submit" onClick={handleSubmit}>
                  Confirm
                </Button>
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default AddPromo;
