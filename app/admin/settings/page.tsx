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
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  init,
  Roles,
  Users,
  Organizations,
  role,
} from "@kinde/management-api-js";
import axios from "axios";
import { access } from "fs";
import { Check, ChevronDownIcon, Send, UserRoundX } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Client } from "pg-promise/typescript/pg-subset";
import ClientCommandItem from "./ClientCommandItem";
import { KindeUser } from "@/app/interfaces/KindeUser";
import ClientRoleCommandItem from "./ClientRoleCommandItem";
import AddTeamMembersButton from "./AddTeamMembersButton";
import { Label } from "@/components/ui/label";
import { or } from "sequelize";

export default async function Dashboard() {
  init();
  const { roles } = await Roles.getRoles();
  // console.log("roles: ", roles);

  const { getOrganization, isAuthenticated, getAccessToken } =
    getKindeServerSession();
  const userAccessToken = await getAccessToken();

  const organization = await getOrganization();
  const orgCode = organization?.orgCode;
  // console.log("organization: ", organization);
  // console.log("orgCode: ", orgCode);

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
  // org_a3685610f6a is the default org for R2W
  const allUsersResponse = await axios.get(
    `https://rush2wager.kinde.com/api/v1/organizations/org_a3685610f6a/users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const allUsers = allUsersResponse.data.organization_users;

  const response = await axios.get(
    `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const users = response.data.organization_users;

  const generalUsersNotInOrg = allUsers.filter(
    (user: KindeUser) =>
      !users.some((orgUser: KindeUser) => orgUser.id === user.id)
  );

  if (!roles || !users) {
    return <div>Loading...</div>;
  }

  function isAdmin(roles: string[]) {
    return roles.includes("promos-admin");
  }

  async function refreshClaims(userId: string) {
    "use server";
    console.log(`Refreshing claims for user ${userId}...`);
    const headers = {
      Accept: "application/json; charset=utf-8",
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await fetch(
      `https://rush2wager.kinde.com/api/v1/users/${userId}/refresh_claims`,
      {
        method: "POST",
        headers: headers,
      }
    );

    console.log("response: ", response.json());
    if (response.status === 200) {
      console.log("User claims refreshed.");
      revalidatePath("/admin/settings");
    } else {
      console.error("Error refreshing user claims.");
      throw new Error("Error refreshing user claims.");
    }
  }

  async function removeUserFromOrg(userId: string) {
    "use server";
    const response = await axios.delete(
      `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response: ", response);
    if (response.status === 200) {
      console.log("User removed from organization.");
      revalidatePath("/admin/settings");
    } else {
      console.log("Error removing user from organization.");
    }
  }

  async function addRoleToUser(roleId: string, user: KindeUser) {
    "use server";
    console.log("Adding role to user...");
    console.log("roleId: ", roleId);
    console.log("user: ", user);
    // console.log("accessToken: ", accessToken);
    // console.log("orgCode: ", orgCode);
    // console.log(
    //   "url: ",
    //   `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users/${user.id}/roles`
    // );
    const response = await fetch(
      `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users/${user.id}/roles`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          role_id: roleId,
        }),
      }
    );
    //console.log("response: ", response);
    if (response.status === 200) {
      console.log("Role added to user.");
      revalidatePath("/admin/settings");
    } else {
      const data = await response.json();
      console.log("data: ", data);
      console.error("Error adding role to user.");
      throw new Error("Error adding role to user.");
    }
  }

  async function removeRoleFromUser(roleId: string, user: KindeUser) {
    "use server";
    console.log("Removing role from user...");
    console.log("roleId: ", roleId);
    console.log("user: ", user);
    const response = await axios.delete(
      `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users/${user.id}/roles/${roleId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response: ", response);
    if (response.status === 200) {
      console.log("Role removed from user.");
      //refreshClaims(user.id);
      revalidatePath("/admin/settings");
    } else {
      console.error("Error removing role from user.");
      throw new Error("Error removing role from user.");
    }
  }

  async function addUserToOrg(userId: string, roles: role) {
    "use server";
    const response = await fetch(
      `https://rush2wager.kinde.com/api/v1/organizations/${orgCode}/users`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          users: [
            {
              id: userId,
              roles: [roles.key!],
            },
          ],
        }),
      }
    );
    console.log("response: ", response);
    if (response.status === 200) {
      console.log("User added to organization.");
      revalidatePath("/admin/settings");
    } else {
      console.error("Error adding user to organization.");
      throw new Error("Error adding user to organization.");
    }
  }

  const hasPromosAdminRole = userAccessToken?.roles?.some(
    (role: role) => role.key === "promos-admin"
  );
  const isReadOnly =
    userAccessToken?.roles?.some((role: role) => role.key === "member") &&
    !hasPromosAdminRole;

  console.log("hasPromosAdminRole: ", hasPromosAdminRole);
  console.log("isReadOnly: ", isReadOnly);

  if (!hasPromosAdminRole && !isReadOnly) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-2 lg:p-6">
      <Card className="relative">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Invite your team members to collaborate.
            </CardDescription>
          </div>
          <div>
            {roles &&
              allUsers &&
              generalUsersNotInOrg &&
              generalUsersNotInOrg.length > 0 && (
                <AddTeamMembersButton
                  allUsers={generalUsersNotInOrg}
                  addUserToOrg={addUserToOrg}
                  roles={roles}
                />
              )}
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 mt-0 border-t pt-4">
          {users.map((user: KindeUser) => (
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
              {isReadOnly ? (
                <Label className="text-muted-foreground">
                  {" "}
                  {isAdmin(user.roles) ? "Admin" : "Member"}{" "}
                </Label>
              ) : (
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
                            <ClientRoleCommandItem
                              key={role.id}
                              user={user}
                              role={role}
                              addRoleToUser={addRoleToUser}
                              removeRoleFromUser={removeRoleFromUser}
                            />
                          ))}
                          <CommandSeparator />
                          <ClientCommandItem
                            userId={user.id}
                            removeUserFromOrg={removeUserFromOrg}
                          />
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
