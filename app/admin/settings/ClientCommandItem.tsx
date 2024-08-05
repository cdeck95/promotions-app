"use client";
import { CommandItem } from "@/components/ui/command";
import { toast } from "@/components/ui/use-toast";
import { UserRoundX } from "lucide-react";
import React from "react";

interface InteractiveCommandItemProps {
  userId: string;
  removeUserFromOrg: (id: string) => void;
}

const ClientCommandItem: React.FC<InteractiveCommandItemProps> = ({
  userId,
  removeUserFromOrg,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <CommandItem
      className="teamaspace-y-1 flex flex-row items-center mt-2 px-4 py-2"
      onSelect={async () => {
        try {
          setIsLoading(true);
          await removeUserFromOrg(userId);
          toast({
            title: "User removed.",
            description: "User has been removed from the organization.",
            variant: "default",
            duration: 3000,
          });
        } catch (error) {
          toast({
            title: "Error",
            description:
              "An error occurred while removing the user from the organization.",
            variant: "destructive",
            duration: 3000,
          });
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {isLoading ? (
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
        <>
          <UserRoundX className="mr-4 h-6 w-6 text-red-500" />
          <div className="flex flex-col items-start">
            <p className="text-red-500">Remove from team</p>
            <p className="text-xs text-muted-foreground text-red-500">
              Remove user from organization.
            </p>
          </div>
        </>
      )}
    </CommandItem>
  );
};

export default ClientCommandItem;
