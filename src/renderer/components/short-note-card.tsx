import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card"
import { Edit2 } from "lucide-react"

export const ShortNoteCard = () => {
    return (
        <Card className="pointer-events-none select-none">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription className='text-xs'>UpdatedAt</CardDescription>
                <CardAction><Edit2 className='w-4 h-4' /></CardAction>
            </CardHeader>
            <CardContent>
                <p className="truncate">Card ContentAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa</p>
            </CardContent>
        </Card>
    )
}