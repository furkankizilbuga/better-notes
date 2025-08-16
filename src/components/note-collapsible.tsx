import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card } from "./ui/card"
import { ChevronDown, Edit2 } from "lucide-react"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"


export const NoteCollapsible = () => {
    const [open, setOpen] = useState(false)
    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <Card className='px-2 py-1 rounded-lg hover:bg-primary/5 gap-2'>
                <CollapsibleTrigger className='text-start flex justify-between items-center hover:cursor-pointer'>
                    <span className='truncate'>Note Header</span>
                    <ChevronDown strokeWidth={1} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </CollapsibleTrigger>
                {open && <Separator />}
                <CollapsibleContent className='relative py-1'>
                    Note Content.
                    <Edit2 className='w-4 h-4 absolute bottom-2 right-1' />
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}