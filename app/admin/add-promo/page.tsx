"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  ChangeEventHandler,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Promotion from "@/lib/models/Promotion";
import { upload } from "@vercel/blob/client";
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
import { addDays, set } from "date-fns";
import { DatePickerWithPresets } from "@/app/components/date-picker-with-presets";
import BetMGMLogo from "@/public/assets/betmgm.png";
import BetriversLogo from "@/public/assets/betrivers.png";
import CaesarsLogo from "@/public/assets/caesars.png";
import HardrockLogo from "@/public/assets/hardrock.webp";
import BetUSLogo from "@/public/assets/betus.jpg";
import BetOnlineLogo from "@/public/assets/betonline.jpg";
import Bet365Logo from "@/public/assets/bet365.png";
import FanaticsLogo from "@/public/assets/fanatics.png";

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
      value: "MLS",
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

  const [dateError, setDateError] = useState<string | null>(null);
  const [platformError, setPlatformError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Promotion data:", promotion);
    console.log("Form data:", e);

    if (!promotion.platform) {
      setPlatformError("Platform is required");
      setDrawerOpen(false);
      toast({
        title: "Error!",
        description: "Platform is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    console.log("Platform is provided");

    if (!promotion.title) {
      setTitleError("Title is required");
      setDrawerOpen(false);
      toast({
        title: "Error!",
        description: "Title is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    console.log("Title is provided");

    if (!promotion.url) {
      setUrlError("URL is required");
      setDrawerOpen(false);
      toast({
        title: "Error!",
        description: "URL is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      // Send POST request to the backend
      const response = await fetch("/api/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: promotion.title,
          description: promotion.description,
          platform: promotion.platform,
          image: promotion.image,
          postedDateTime: promotion.postedDateTime,
          leagueName: promotion.leagueName,
          code: promotion.code,
          url: promotion.url,
          expiryDate: promotion.expiryDate,
          featured: promotion.featured,
          applicableState: promotion.applicableState,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (data.error) {
        console.log("Error creating promotion:", data.error);
        toast({
          title: "Error!",
          description: data.message,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        // Handle successful response
        console.log("Promotion created successfully:", data);
        toast({
          title: "Success!",
          description: "Promotion created successfully.",
          variant: "default",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating promotion:", error);
      toast({
        title: "Error!",
        description: "An error occurred while creating the promotion.",
        variant: "destructive",
        duration: 3000,
      });
    }
    resetForm();
  };

  const OpenDrawer = () => {
    if (!promotion.platform) {
      setPlatformError("Platform is required");
      toast({
        title: "Error!",
        description: "Platform is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setPlatformError(null);
    if (!promotion.title) {
      setTitleError("Title is required");
      toast({
        title: "Error!",
        description: "Title is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setTitleError(null);

    if (!promotion.url) {
      setUrlError("URL is required");
      setDrawerOpen(false);
      toast({
        title: "Error!",
        description: "URL is required.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setUrlError(null);
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
      setDateError("Start date cannot be on or after the expiry date.");
    } else {
      setDateError(null);
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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!fileInputRef.current?.files) {
      toast({
        title: "Error!",
        description: "No file selected.",
        variant: "destructive",
        duration: 3000,
      });
      throw new Error("No file selected");
    }
    const file = fileInputRef.current.files[0];
    const newBlob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/promoImage/upload",
    });
    setPromotion({ ...promotion, image: newBlob.url });
  };

  const platforms = [
    {
      logo: FanduelLogo,
      alt: "Fanduel Sportsbook Logo",
      displayName: "Fanduel",
      description: "Fanduel Sportsbook & Casino",
      value: "Fanduel",
    },
    {
      logo: DraftkingsLogo,
      alt: "Draftkings Sportsbook Logo",
      displayName: "Draftkings",
      description: "Draftkings Sportsbook",
      value: "Draftkings",
    },
    {
      logo: ESPNBetLogo,
      alt: "ESPN Bet Logo",
      displayName: "ESPN Bet",
      description: "ESPN Bet - The official sportsbook of ESPN",
      value: "ESPN Bet",
    },
    {
      logo: BetMGMLogo,
      alt: "Bet MGM Logo",
      displayName: "Bet MGM",
      description: "Bet MGM - The King of Sportsbooks",
      value: "Bet MGM",
    },
    {
      logo: BetriversLogo,
      alt: "Betrivers Sportsbook Logo",
      displayName: "Betrivers",
      description: "Betrivers Sportsbook",
      value: "Betrivers",
    },
    {
      logo: CaesarsLogo,
      alt: "Caesars Sportsbook Logo",
      displayName: "Caesars",
      description: "Caesars Sportsbook",
      value: "Caesars",
    },
    {
      logo: HardrockLogo,
      alt: "Hardrock Sportsbook Logo",
      displayName: "Hardrock",
      description: "Hardrock Sportsbook",
      value: "Hardrock",
    },
    {
      logo: BetUSLogo,
      alt: "Bet US Logo",
      displayName: "Bet US",
      description: "Bet US - America's Favorite Sportsbook",
      value: "Bet US",
    },
    {
      logo: BetOnlineLogo,
      alt: "BetOnline Logo",
      displayName: "BetOnline",
      description: "BetOnline Sportsbook",
      value: "BetOnline",
    },
    {
      logo: Bet365Logo,
      alt: "Bet365 Logo",
      displayName: "Bet365",
      description: "Bet365 Sportsbook",
      value: "Bet365",
    },
    {
      logo: FanaticsLogo,
      alt: "Fanatics Logo",
      displayName: "Fanatics",
      description: "Fanatics Sportsbook",
      value: "Fanatics",
    },
  ];

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
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        <div className="flex items-center justify-center gap-3 text-muted-foreground w-full">
                          <Image
                            src={platform.logo}
                            width={30}
                            height={30}
                            alt={platform.alt}
                            className="rounded-sm"
                          />
                          <div className="grid gap-0.5">
                            <p>
                              <span className="font-medium text-foreground">
                                {platform.displayName}
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              {platform.description}
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {platformError && (
                  <Label className="text-red-800 text-sm">
                    {platformError}
                  </Label>
                )}
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
                {titleError && (
                  <Label className="text-red-800 text-sm">{titleError}</Label>
                )}
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
                {dateError && (
                  <Label className="text-red-800 text-sm">{dateError}</Label>
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
                {urlError && (
                  <Label className="text-red-800 text-sm">{urlError}</Label>
                )}
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
              onChange={handleImageChange}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => {
              //   const file = e.target.files?.[0];
              //   if (file) {
              //     const reader = new FileReader();
              //     reader.onload = () => {
              //       setPromotion({
              //         ...promotion,
              //         image: reader.result as string,
              //       });
              //     };
              //     reader.readAsDataURL(file);
              //   }
              // }}
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
          <DrawerContent className="p-4  lg:mt-0">
            <div className="p-4 pt-[60px] lg:mt-0 relative">
              <h2 className="text-xl font-bold mb-4">Confirm Promotion Info</h2>
              <div className="grid gap-4">
                <div className="flex ">
                  {promotion.image && (
                    <div className="mr-4 h-full ">
                      <Image
                        src={promotion.image}
                        alt="Promotion Image"
                        width={144}
                        height={144}
                        className="object-cover "
                      />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 min-w-[100px] pt-2">
                    <Badge variant="outline" className="mx-2">
                      {promotion.leagueName}
                    </Badge>
                    {promotion.applicableState && (
                      <Badge variant="outline" className="mx-2">
                        {promotion.applicableState}
                      </Badge>
                    )}
                    {promotion.featured && (
                      <Badge variant="outline" className="mx-2 bg-green-500">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">Platform:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.platform}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">Title:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.title}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">Description:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.description}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">Code:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.code}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">Start Date:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.postedDateTime.toDateString()}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">End Date:</span>
                      <span className="text-sm text-muted-foreground">
                        {promotion.expiryDate.toDateString()}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span className="font-bold text-sm">URL:</span>
                      <a
                        className="text-sm text-muted-foreground text-blue-500"
                        href={promotion.url}
                      >
                        {promotion.url}
                      </a>
                    </div>

                    {/* <div className="flex flex-row gap-2">
                      <span className="font-bold">League Name:</span>
                      <span>{promotion.leagueName}</span>
                    </div> */}
                    {/* <div className="flex flex-row gap-2">
                      <span className="font-bold">Featured:</span>
                      <span>{promotion.featured ? "Yes" : "No"}</span>
                    </div> */}
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
