import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card"
import { Edit2 } from "lucide-react"
import type { Note } from "@/renderer/types/note"
import { formatDate, JSONContentToString } from "../lib/utils"

type TProps = {
    note: Note
}

// TODO: Edit butonu
export const ShortNoteCard = ({ note }: TProps)  => {
    return (
        <Card className="pointer-events-none">
            <CardHeader>
                <CardTitle>{note?.title || ""}</CardTitle>
                <CardDescription className='text-xs'>{formatDate(note.updatedAt)}</CardDescription>
                <CardAction><Edit2 className='w-4 h-4' /></CardAction>
            </CardHeader>
            <CardContent>
                <p className="truncate">{JSONContentToString(note.content)}</p>
            </CardContent>
        </Card>
    )
}