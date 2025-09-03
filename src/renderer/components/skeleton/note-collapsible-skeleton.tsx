import { Collapsible, CollapsibleTrigger } from "@/renderer/components/ui/collapsible"
import { Card } from "../ui/card"

export const NoteCollapsibleSkeleton = () => {
    return (
        <Collapsible open={true}>
            <Card className='px-2 py-1 rounded-lg gap-2 h-10'>
                <CollapsibleTrigger className='h-full text-start flex gap-2 justify-between items-center'>
                    <span className='h-5 w-full bg-gray-200 rounded animate-pulse'></span>
                    <div className='h-5 w-4 bg-gray-200 rounded animate-pulse'></div>
                </CollapsibleTrigger>
            </Card>
        </Collapsible>
    )
}
