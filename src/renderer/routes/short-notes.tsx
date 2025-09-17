/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShortNoteCard } from '@/renderer/components/short-note-card';
import { Container } from '@/renderer/components/ui/container'
import { createFileRoute } from '@tanstack/react-router'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { InputWithButton } from '@/renderer/components/input-with-button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataService } from '@/renderer/services/data-service';
import { useEffect, useState } from 'react';
import { ShortNoteCardSkeleton } from '../components/skeleton/short-note-card-skeleton';
import { stringToJSONContent } from '../lib/utils';
import type { Note } from '@/renderer/types/note';

export const Route = createFileRoute('/short-notes')({
    component: RouteComponent,
})

function DraggableShortNoteCard({ id, note }: { id: string, note: Note }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ShortNoteCard note={note} />
        </div>
    );
}

function RouteComponent() {
    const queryClient = useQueryClient();
    const { data: shortNotes = [], isLoading } = useQuery({
        queryKey: ['short-notes'],
        queryFn: DataService.GetAllShortNotes,
        staleTime: 5 * 60 * 1000
    });

    const [initialInput, setInitialInput] = useState<string>('');
    const [shortNoteIds, setShortNoteIds] = useState<string[]>([]);

    useEffect(() => {
        setShortNoteIds(shortNotes.map(i => i.externalId));
    }, [shortNotes])

    // CreateShortNote
    const createShortNote = useMutation({
        mutationFn: DataService.CreateShortNote,
        onSuccess: () => {
            setInitialInput('');
            queryClient.refetchQueries({ queryKey: ['short-notes'] });
        }
    })

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setShortNoteIds((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handleAddShortNote = () => {
        if (!initialInput) return;
        createShortNote.mutate({
            title: '',
            content: stringToJSONContent(initialInput),
        })
    }

    // TODO: Dragged position kaydedilmiyor. order gibi bir bilgi lazım.

    return (
        <Container>
            <InputWithButton value={initialInput} onChange={(e) => setInitialInput(e.target.value)} onClick={handleAddShortNote} className='my-4' />
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={shortNoteIds} strategy={rectSortingStrategy}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                        {isLoading && Array.from({ length: 9 }).map((_, i) => <ShortNoteCardSkeleton key={i} />)}
                        {!isLoading && shortNoteIds.map(id => {
                            const note = shortNotes.find(n => n.externalId === id)!;
                            return <DraggableShortNoteCard key={id} id={id} note={note} />;
                        })}
                    </div>
                </SortableContext>
            </DndContext>
        </Container>
    )
}
