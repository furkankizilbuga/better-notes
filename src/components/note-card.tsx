import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Note } from "@/types/note"

type TProps = {
    note: Note
}

export const NoteCard = ({ note }: TProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    )
}