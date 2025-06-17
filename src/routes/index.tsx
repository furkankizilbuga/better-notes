import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            
        </div>
    )
}
