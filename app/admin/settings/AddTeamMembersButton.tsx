"use client";

import { KindeUser } from "@/app/interfaces/KindeUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDownIcon, Plus, Send } from "lucide-react";
import React from "react";
import ClientCommandItem from "./ClientCommandItem";
import ClientRoleCommandItem from "./ClientRoleCommandItem";
import { role, roles } from "@kinde/management-api-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface InteractiveCommandItemProps {
  allUsers: KindeUser[];
  addUserToOrg: (userId: string, roles: role) => void;
  roles: roles[];
}

const AddTeamMembersButton: React.FC<InteractiveCommandItemProps> = ({
  allUsers,
  addUserToOrg,
  roles,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [roleForInvite, setRoleForInvite] = React.useState<roles>(roles[1]);

  const [isMobile, setIsMobile] = React.useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    accessToken,
    getAccessToken,
    user,
    isAuthenticated,
    isLoading: loadingUser,
  } = useKindeBrowserClient();

  const hasPromosAdminRole = accessToken?.roles?.some(
    (role) => role.key === "promos-admin"
  );

  const isReadOnly = !hasPromosAdminRole;

  // console.log("allUsers: ", allUsers);
  console.log("roles: ", roles);
  console.log("roleForInvite: ", roleForInvite);

  const openPopup = () => {
    setIsOpen(true);
  };

  const addUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await addUserToOrg(userId, roleForInvite);
      toast({
        title: `Success`,
        description: `User added to organization.`,
        variant: "default",
        duration: 3000,
      });
      console.log("User added to organization.");
    } catch (error) {
      console.error("Error adding user to organization: ", error);
      toast({
        title: "Error",
        description:
          "An error occurred while adding the user to the organization.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="default"
              className="ml-auto"
              onClick={openPopup}
              disabled={isReadOnly}
            >
              <Plus className="lg:mr-2 p-0 h-4 w-4" />
              {!isMobile && "Add Team Member"}
            </Button>
          </TooltipTrigger>
          {isReadOnly && (
            <TooltipContent>
              <Label className="text-xs">Action restricted to admins.</Label>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[325px] lg:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription className="text-sm">
              Add your team members to collaborate.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {allUsers.length > 5 && (
              <Input
                placeholder="Search users..."
                className="w-full border border-muted-foreground rounded-md px-4 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            <ScrollArea className="h-full flex flex-col gap-8">
              {allUsers.map((user) => (
                <div
                  className="flex items-center space-x-4 w-full justify-between"
                  key={user.id}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.picture} />
                      <AvatarFallback>
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {user.first_name}
                        {user.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
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
                    <Button
                      variant="default"
                      onClick={() => addUser(user.id)}
                      disabled={isReadOnly}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add as{" "}
                      {roles.find((role) => role.id === roleForInvite.id)?.name}
                    </Button>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Label className="text-muted-foreground text-xs mr-4">
              <strong>Note:</strong> You can only add users who have created an
              account. If the user has not created an account, please instruct
              them to create an account and then come back.
            </Label>

            <Select
              value={roleForInvite ? roleForInvite.id : ""}
              onValueChange={(value) =>
                setRoleForInvite(roles.find((role) => role.id === value)!)
              }
            >
              <SelectTrigger
                id="role-select"
                aria-label="Select Role Type"
                className="w-1/2"
              >
                <SelectValue placeholder="Select Role Type" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id!}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTeamMembersButton;
