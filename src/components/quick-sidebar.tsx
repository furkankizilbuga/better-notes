import { useState } from "react";
import { InputWithButton } from "./input-with-button"
import { NoteCollapsible } from "./note-collapsible"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateShortNote, GetAllNotes } from "@/services/note-service";
import { Container } from "./ui/container";
import { stringToJSONContent } from "@/lib/utils";
import { NoteCollapsibleSkeleton } from "./skeleton/note-collapsible-skeleton";
import type { Note } from "@/types/note";

// TODO: Aktif olan en üstt editable olarak duracak.
// TODO: scrollArea
export const QuickSidebar = () => {
    const [initialInput, setInitialInput] = useState<string>('');
    const [activeShortNote, setActiveShortNote] = useState<Note | null>(null);
    const queryClient = useQueryClient();

    const { data: shortNotes = [], isLoading } = useQuery({
        queryKey: ['short-notes'],
        queryFn: () => GetAllNotes({ isShort: true }),
        staleTime: 5 * 60 * 1000
    });

    // CreateShortNote
    const createShortNote = useMutation({
        mutationFn: CreateShortNote,
        onSuccess: () => {
            setInitialInput('');
            queryClient.refetchQueries({ queryKey: ['short-notes'] });
        }
    })

    const handleAddShortNote = () => {
        if (!initialInput) return;
        createShortNote.mutate({
            title: '',
            content: stringToJSONContent(initialInput),
        })
    }

    return (
        <div className="h-screen p-4 flex flex-col gap-4">
            <InputWithButton value={initialInput} onChange={(e) => setInitialInput(e.target.value)} onClick={handleAddShortNote} />
            <Container className="flex flex-col gap-2 px-0">
                {isLoading && Array.from({ length: 3 }).map((_, i) => <NoteCollapsibleSkeleton key={i} />)}
                {!isLoading && shortNotes.map((note, index) => (
                    <NoteCollapsible 
                        key={index} 
                        note={note} 
                        activeShortNote={activeShortNote} 
                        setActiveShortNote={setActiveShortNote} 
                    />
                ))}
            </Container>
        </div>
    )
}