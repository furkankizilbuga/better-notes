import { Home, Inbox } from "lucide-react"
import { Link } from "@tanstack/react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/renderer/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    path: "/",
    icon: Home,
  },
  {
    title: "My Notes",
    path: "/notes",
    icon: Inbox,
  },
]

export function AppSidebar() {
  //TODO: Açılış ve kapanış akıcı değil.
  return (
    <Sidebar onClick={() => console.log(window.env?.isElectron)}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}