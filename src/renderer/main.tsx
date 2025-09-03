//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/renderer/styles/globals.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '@/renderer/routeTree.gen'
import { Providers } from '@/renderer/providers/index';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)
