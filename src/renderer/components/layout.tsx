import { SidebarProvider, SidebarTrigger } from "@/renderer/components/ui/sidebar"
import { AppSidebar } from "@/renderer/components/app-sidebar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable"
import { QuickSidebar } from "./quick-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full'>
        <ResizablePanelGroup direction='horizontal'>
          <SidebarTrigger />
          <ResizablePanel defaultSize={75} minSize={50}>
            {children}
          </ResizablePanel>
          <ResizableHandle withHandle />          
          <ResizablePanel collapsible defaultSize={25} maxSize={30} minSize={15}>
            <QuickSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </SidebarProvider>
  )
}