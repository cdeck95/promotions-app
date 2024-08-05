"use server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { init, Roles, Users, Organizations } from "@kinde/management-api-js";
import axios from "axios";
import { access } from "fs";
import { ChevronDownIcon } from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
  roles: string[];
}

export default async function Dashboard() {
  init();
  const { roles } = await Roles.getRoles();
  console.log("roles: ", roles);

  const { getOrganization, isAuthenticated } = getKindeServerSession();

  const organization = await getOrganization();
  const orgCode = organization?.orgCode;
  console.log("organization: ", organization);
  console.log("orgCode: ", orgCode);

  const client_id = process.env.KINDE_CLIENT_ID!;
  const client_secret = process.env.KINDE_CLIENT_SECRET!;

  const accessTokenResponse = await fetch(
    `https://rush2wager.kinde.com/oauth2/token`,
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        audience: "https://rush2wager.kinde.com/api",
        grant_type: "client_credentials",
        client_id: client_id,
        client_secret: client_secret,
      }),
    }
  );

  const accessTokenJSON = await accessTokenResponse.json();
  const accessToken = accessTokenJSON.access_token;

  console.log("accessToken: ", accessToken);

  if (!accessToken || !orgCode || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  const response = await axios.get(
    `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log("response: ", response);

  const users = response.data.organization_users;
  console.log("users: ", users);

  if (!roles || !users) {
    return <div>Loading...</div>;
  }

  function isAdmin(roles: string[]) {
    return roles.includes("promos-admin");
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {users.map((user: User) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4"
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
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    {isAdmin(user.roles) ? "Admin" : "Member"}{" "}
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="end">
                  <Command>
                    <CommandInput placeholder="Select new role..." />
                    <CommandList>
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup>
                        {roles.map((role) => (
                          <CommandItem
                            key={role.id}
                            className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                          >
                            <p>{role.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {role.description}
                            </p>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
