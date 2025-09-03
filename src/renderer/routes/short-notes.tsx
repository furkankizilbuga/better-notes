/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShortNoteCard } from '@/renderer/components/short-note-card';
import { Container } from '@/renderer/components/ui/container'
import { createFileRoute } from '@tanstack/react-router'
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { InputWithButton } from '@/renderer/components/input-with-button';

export const Route = createFileRoute('/short-notes')({
    component: RouteComponent,
})

function DraggableShortNoteCard({ id }: { id: number }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ShortNoteCard />
        </div>
    );
}

function RouteComponent() {
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    const handleSendMessage = () => {

    }

    // TODO: Notlar alt alta da gelebilir grid de olabilir.

    return (
        <Container>
            <InputWithButton className='my-4' onClick={handleSendMessage} />
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
                        {items.map((i) => (
                            <DraggableShortNoteCard key={i} id={i} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </Container>
    )
}
