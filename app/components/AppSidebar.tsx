import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/Sidebar";
import { useOptionalUser } from "~/lib/utils";
import { Avatar } from "./ui/Avatar";
import { useNavigate } from "@remix-run/react";
import { Menu } from "lucide-react";

function UserMenuButton() {
  const user = useOptionalUser();
  const username = user?.username ?? user?.email;

  const navigate = useNavigate();

  function handleClick() {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    // else...
    // 아직 개발 중
  }

  return (
    <SidebarMenuButton size="lg" onClick={handleClick}>
      {!!user && <Avatar src={user?.avatar?.url} alt={username} />}
      <p className="underline">{!user ? "로그인이 필요합니다" : username}</p>
    </SidebarMenuButton>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-4 p-2">
              <Menu />
              <h1 className="text-lg font-semibold">채팅</h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenuButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
