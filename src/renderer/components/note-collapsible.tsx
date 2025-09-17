import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/renderer/components/ui/collapsible"
import { Card } from "./ui/card"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Separator } from "@/renderer/components/ui/separator"
import type { Note, NotePayload } from "@/renderer/types/note"
import { ShortNotePopover } from "./short-note-popover"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "@/renderer/hooks/use-debounce"
import TiptapEditor from "./editor/TiptapEditor"
import { JSONContentToString } from "@/renderer/lib/utils"
import { DataService } from '@/renderer/services/data-service'

type TProps = {
    note: Note;
    activeShortNote?: Note | null;
    setActiveShortNote: (note: Note | null) => void;
}

const AUTO_UPDATE_DELAY = 1000;

// TODO: Collapse'e tıklayınca direkt editör açılıyor. Sadece edit butonuna bağlı olmalı.
// TODO: Menüde gözüken collapsible içerisinde gözüken değerler debounced update sonrası güncelleniyor.
export const NoteCollapsible = ({ note, activeShortNote, setActiveShortNote }: TProps) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false)
    const isPopoverOpen = activeShortNote?.id === note.id;

    const [shortNotePayload, setShortNotePayload] = useState<NotePayload | null>(null);
    const debouncedNote = useDebounce(shortNotePayload, AUTO_UPDATE_DELAY)

    // UpdateShortNote
    const updateShortNote = useMutation({
        mutationFn: ({ notePayload, externalId }: { notePayload: NotePayload, externalId: string }) => {
            return DataService.UpdateNoteByExternalId(notePayload, externalId)
        },
        onSuccess: (res) => {
            queryClient.setQueryData<Note[]>(['short-notes'], (oldNotes = []) => (
                oldNotes.map(note => note.externalId === res.externalId ? res : note)
            ))
        }
    })

    // Kapanırken demount olmadığı için debounce devam ediyor ve updateliyor. Ekstradan ayrılırken update atmasına gerek yok.
    useEffect(() => {
        if (debouncedNote) updateShortNote.mutate({ notePayload: debouncedNote, externalId: note.externalId });
    }, [debouncedNote])


    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <Card className='px-2 py-1 rounded-lg hover:bg-primary/5 gap-2'>
                <CollapsibleTrigger className='text-start flex justify-between items-center hover:cursor-pointer'>
                    <span className='truncate'>{note?.title || JSONContentToString(note.content)}</span>
                    <ChevronDown strokeWidth={1} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </CollapsibleTrigger>
                {open && <Separator />}
                <CollapsibleContent className='py-1 flex gap-2 items-center'>
                    <ShortNotePopover open={isPopoverOpen} onOpenChange={(val) => setActiveShortNote(val ? note : null)}>
                        {/* İlk yüklendiğinde shortNotePayload boş olacak ve db'den gelen kayıtlı olan notu gösteriyoruz. Payload doldukça ona geçiyoruz ve güncel kalıyor hep. */}
                        <TiptapEditor notePayload={shortNotePayload || {
                            title: note.title,
                            content: note.content
                        }} setNotePayload={setShortNotePayload} />
                    </ShortNotePopover>
                    <p className="truncate">{JSONContentToString(note.content)}</p>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}