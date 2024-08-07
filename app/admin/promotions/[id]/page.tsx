"use client";

import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  ChangeEventHandler,
  useEffect,
} from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import Promotion, { PromotionAttributes } from "@/lib/models/Promotion";
import { upload } from "@vercel/blob/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  CloudUpload,
  FileImage,
  Rabbit,
  Trash2,
} from "lucide-react";
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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { del } from "@vercel/blob";

function AddPromo({ params }: { params: { id: string } }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const today = new Date();
  const router = useRouter();
  const [dateError, setDateError] = useState<string | null>(null);
  const [platformError, setPlatformError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const promoId = params.id;
  console.log("Promotion ID:", promoId);

  const [promotion, setPromotion] = useState<PromotionAttributes>({
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

  const [ogPromotion, setOGPromotion] = useState<PromotionAttributes>({
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

  const fetchPromotion = async () => {
    setLoading(true);
    fetch(`/api/promotions/${promoId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Promotion data:", data);
        setPromotion(data);
        setOGPromotion(data);
        if (data.image) {
          loadImageFile(data.image);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching promotion:", error);
        setLoading(false);
      });
  };

  const loadImageFile = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.png", { type: blob.type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
    } catch (error) {
      console.error("Error loading image file:", error);
    }
  };
  useEffect(() => {
    if (promoId) {
      fetchPromotion();
    }
  }, [promoId]);

  const {
    accessToken,
    getAccessToken,
    user,
    isAuthenticated,
    isLoading: loadingUser,
  } = useKindeBrowserClient();
  const aTok = getAccessToken();

  // console.log(accessToken, aTok);

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
    setHasChanges(true);
    validateDates(date, promotion.expiryDate);
  };

  const handleExpiryDateChange = (date: Date) => {
    setPromotion({ ...promotion, expiryDate: date });
    setHasChanges(true);
    validateDates(promotion.postedDateTime, date);
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (promotion.image) {
      toast({
        title: "Error!",
        description:
          "Please remove the existing image before uploading a new one.",
        variant: "destructive",
        duration: 3000,
      });
      // Reset the file input value
      if (fileInputRef.current) {
        loadImageFile(promotion.image);
      }
      return;
    }

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
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPromotion({
          ...promotion,
          image: reader.result as string,
        });
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
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

  const [customPlatform, setCustomPlatform] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const hasPromosAdminRole = accessToken?.roles?.some(
    (role) => role.key === "promos-admin"
  );

  const [hasChanges, setHasChanges] = useState(false);

  const handleDiscard = () => {
    // Logic to discard changes and restore original values
    if (promotion) {
      setPromotion(ogPromotion); //reset the copy to original values
      setHasChanges(false);
      setIsOtherSelected(false);
    }
  };

  const handleSave = async () => {
    // Logic to save changes
    console.log("Saving these values: ", promotion);
    setIsSaving(true);

    // Validate the promotion
    if (!promotion.platform) {
      setPlatformError("Platform is required.");
      setIsSaving(false);
      return;
    }
    if (!promotion.title) {
      setTitleError("Title is required.");
      setIsSaving(false);
      return;
    }
    if (!promotion.url) {
      setUrlError("URL is required.");
      setIsSaving(false);
      return;
    }
    if (
      promotion.platform === "other" &&
      (!customPlatform || customPlatform === "")
    ) {
      setPlatformError("Please enter a platform name.");
      setIsSaving(false);
      return;
    }

    let promoToSave = promotion;
    if (promoToSave.platform === "other") {
      promoToSave.platform = customPlatform;
    }

    let imageURL = "";
    if (promotion.image && !ogPromotion.image) {
      // If the image is new, upload it
      try {
        if (fileInputRef.current?.files) {
          const file = fileInputRef.current.files[0];
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/promoImage/upload",
          });
          setPromotion({ ...promotion, image: newBlob.url });
          imageURL = newBlob.url;
          promoToSave = { ...promoToSave, image: newBlob.url };
          console.log("Uploaded image:", newBlob.url);
          console.log("Promotion to save:", promoToSave);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast({
          title: "Error!",
          description: "An error occurred while uploading the image.",
          variant: "destructive",
          duration: 3000,
        });
        setLoading(false);
        return;
      }
    }

    // Call the API to update the promotion
    fetch(`/api/promotions/${promoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promoToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Updated promotion:", data);
        setHasChanges(false);
        toast({
          title: "Success!",
          description: "Promotion updated successfully.",
          variant: "default",
          duration: 3000,
        });
        fetchPromotion();
        setIsSaving(false);
        setIsPendingDelete(false);
      })
      .catch((error) => {
        console.error("Error updating promotion:", error);
        setIsSaving(false);
        toast({
          title: "Error!",
          description: "Error updating promotion.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Form submitted");
  };

  const handleRemoveImage = () => {
    setPromotion({ ...promotion, image: "" });
    setHasChanges(true);
    setIsPendingDelete(true);
    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isAuthenticated && !hasPromosAdminRole && !loadingUser) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="grid grid-col-1 p-2 lg:p-6 gap-4 h-full w-full items-start">
      <div className="flex flex-row gap-4 text-2xl font-bold text-left pb-2 my-0 bg-gradient-custom">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Promo #{promoId}
        </h1>
        {hasChanges && (
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" onClick={handleDiscard}>
              Discard
            </Button>
            <Button size="sm" onClick={handleSave}>
              {isSaving ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        )}
      </div>
      <main className="grid flex-1 gap-4 overflow-auto md:grid-cols-2 lg:grid-cols-5">
        <div className="relative flex flex-col items-start gap-8 md:flex lg:col-span-3">
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
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Select
                    value={promotion.platform}
                    onValueChange={(value) => {
                      if (value === "other") {
                        setIsOtherSelected(true);
                        setPromotion({
                          ...promotion,
                          platform: "other",
                        });
                        setHasChanges(true);
                      } else {
                        setIsOtherSelected(false);
                        setPromotion({ ...promotion, platform: value });
                        setHasChanges(true);
                      }
                    }}
                  >
                    <SelectTrigger className="[&_[data-description]]:hidden">
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
                      <SelectItem value="other">Other (write in)</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {/* {platformError && (
                  <Label className="text-red-800 text-sm">
                    {platformError}
                  </Label>
                )} */}
                {isOtherSelected && (
                  <Input
                    type="text"
                    id="otherPlatform"
                    name="Other Platform"
                    placeholder="Enter platform name"
                    value={customPlatform}
                    onChange={(e) => {
                      setCustomPlatform(e.target.value);
                      setPromotion({ ...promotion, platform: "other" });
                      setHasChanges(true);
                    }}
                    className="mt-2 p-2 border rounded"
                  />
                )}
                {platformError && (
                  <Label className="text-red-800 text-sm">
                    {platformError}
                  </Label>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Input
                    id="title"
                    name="Title"
                    value={promotion.title}
                    onChange={(e) => {
                      setPromotion({ ...promotion, title: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="i.e., $1000 Risk-Free Bet"
                  />
                )}
                {titleError && (
                  <Label className="text-red-800 text-sm">{titleError}</Label>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Description</Label>
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Textarea
                    id="description"
                    name="Description"
                    value={promotion.description}
                    onChange={(e) => {
                      setPromotion({
                        ...promotion,
                        description: e.target.value,
                      });
                      setHasChanges(true);
                    }}
                    placeholder="i.e., Get a $1000 risk-free bet when you sign up and deposit $10 or more. Terms and conditions apply."
                    className="min-h-[9.5rem]"
                  />
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Code</Label>
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Input
                    id="code"
                    name="Code"
                    value={promotion.code}
                    onChange={(e) => {
                      setPromotion({ ...promotion, code: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="i.e., BET1000"
                  />
                )}
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Promo Details
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="brand">Start Date</Label>
                {loading ? (
                  <Skeleton className="w-50 h-10" />
                ) : (
                  <DatePickerWithPresets
                    value={promotion.postedDateTime}
                    onChange={handleStartDateChange}
                  />
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="brand">End Date</Label>
                {loading ? (
                  <Skeleton className="w-50 h-10" />
                ) : (
                  <DatePickerWithPresets
                    value={promotion.expiryDate}
                    onChange={handleExpiryDateChange}
                  />
                )}
                {dateError && (
                  <Label className="text-red-800 text-sm">{dateError}</Label>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="color">URL</Label>
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Input
                    id="url"
                    name="URL"
                    value={promotion.url}
                    onChange={(e) => {
                      setPromotion({ ...promotion, url: e.target.value });
                      setHasChanges(true);
                    }}
                    placeholder="The URL to the promotion"
                  />
                )}
                {urlError && (
                  <Label className="text-red-800 text-sm">{urlError}</Label>
                )}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bin">League Name</Label>
                {loading ? (
                  <Skeleton className="w-100 h-10" />
                ) : (
                  <Select
                    value={promotion.leagueName || ""}
                    onValueChange={(value) => {
                      setPromotion({ ...promotion, leagueName: value });
                      setHasChanges(true);
                    }}
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
                )}
              </div>
            </fieldset>
          </form>
        </div>
        <div className="relative flex flex-col max-h-fit rounded-xl bg-muted/50 p-4 gap-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
            Photo Upload
          </Badge>
          <div className="flex-1 mt-8 max-h-[600px]">
            {promotion.image ? (
              <div className="flex flex-row w-full  justify-between items-center">
                <Image
                  src={promotion.image}
                  alt="Promotion Image"
                  width={1800}
                  height={1800}
                  className="object-contain rounded-lg h-full w-[80%]"
                />
                <Trash2
                  className="h-4 w-4 lg:w-6 lg:h-6 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveImage()}
                />
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col cursor-pointer gap-4 items-center justify-center w-full h-full min-h-[200px] bg-background border border-muted/50 rounded-lg"
              >
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <>
                    <CloudUpload size={64} />
                    <Label className="text-muted-foreground cursor-pointer">
                      Click to upload an image
                    </Label>
                  </>
                )}
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
              disabled={promotion.image !== "" || isPendingDelete}
              onChange={handleImageChange}
              className="border-0 p-2 pt-2 cursor-pointer focus-visible:ring-0"
            />
            <div className="flex items-center gap-3 my-3">
              {loading ? (
                <Skeleton className="ml-2 w-4 h-4" />
              ) : (
                <Checkbox
                  id="featured"
                  name="featured"
                  checked={promotion.featured}
                  className="mt-0 ml-3"
                  onCheckedChange={(checked) => {
                    setPromotion({ ...promotion, featured: Boolean(checked) });
                    setHasChanges(true);
                  }}
                />
              )}
              <Label htmlFor="textUser" className="text-sm">
                Featured Promotion?
              </Label>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddPromo;
