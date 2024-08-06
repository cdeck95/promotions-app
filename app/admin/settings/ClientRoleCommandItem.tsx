"use client";
import { KindeUser } from "@/app/interfaces/KindeUser";
import { CommandItem } from "@/components/ui/command";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { role, roles } from "@kinde/management-api-js";
import { Check, UserRoundX } from "lucide-react";
import React from "react";

interface InteractiveCommandItemProps {
  user: KindeUser;
  role: roles;
  addRoleToUser: (role: string, user: KindeUser) => void;
  removeRoleFromUser: (role: string, user: KindeUser) => void;
}

const ClientRoleCommandItem: React.FC<InteractiveCommandItemProps> = ({
  user,
  role,
  addRoleToUser,
  removeRoleFromUser,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <CommandItem
      key={role.id}
      className="teamaspace-y-1 flex flex-row items-center px-4 py-2"
      onSelect={async () => {
        console.log("role selected: ", role);
        setIsLoading(true);
        console.log("role key: ", role.key);
        if (user.roles.includes(role.key!)) {
          try {
            await removeRoleFromUser(role.id!, user);
            toast({
              title: `Success`,
              description: `Role "${role.name}" removed from ${user.given_name}`,
              variant: "default",
              duration: 3000,
            });
          } catch (error) {
            toast({
              title: "Error",
              description: `An error occurred while removing the role ${role.name} to ${user.given_name}.`,
              variant: "destructive",
              duration: 3000,
            });
          } finally {
            setIsLoading(false);
          }
        } else {
          try {
            await addRoleToUser(role.id!, user);
            toast({
              title: `Success`,
              description: `Role ${role.name} added to ${user.given_name}`,
              variant: "default",
              duration: 3000,
            });
          } catch (error) {
            toast({
              title: "Error",
              description: `An error occurred while adding the role ${role.name} to ${user.given_name}.`,
              variant: "destructive",
              duration: 3000,
            });
          } finally {
            setIsLoading(false);
          }
        }
      }}
    >
      <Check
        className={cn(
          "mr-4 h-6 w-6",
          user.roles.includes(role.key!) ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="flex flex-col items-start">
        <p>{role.name}</p>
        <p className="text-xs text-muted-foreground">{role.description}</p>
      </div>
    </CommandItem>
  );
};

export default ClientRoleCommandItem;
