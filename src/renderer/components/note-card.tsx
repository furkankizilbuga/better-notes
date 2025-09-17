import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/renderer/components/ui/card"
import type { Note } from "@/renderer/types/note"
import { useNavigate } from "@tanstack/react-router"
import { Edit2 } from "lucide-react"

type TProps = {
    note: Note
}

// TODO: Content'in başları title'da gözükecek eğer title yok ise.
// card content içerisinde de truncate edilmiş content gösterelim
export const NoteCard = ({ note }: TProps) => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate({ to: `/notes/${note.externalId}`, replace: true });
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{note.title}</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction onClick={handleNavigation}><Edit2 className='w-4 h-4 cursor-pointer' /></CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    )
}