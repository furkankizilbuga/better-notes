import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='flex justify-center items-center w-full h-full'>Hello "/not-found"!</div>
}
