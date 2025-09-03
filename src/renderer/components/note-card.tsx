import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/renderer/components/ui/card"
import type { Note } from "@/renderer/types/note"

type TProps = {
    note: Note
}

// TODO: Content'in başları title'da gözükecek eğer title yok ise.
// card content içerisinde de truncate edilmiş content gösterelim
export const NoteCard = ({ note }: TProps) => {
    return (
        <Card className="h-40 w-36">
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