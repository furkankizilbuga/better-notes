import { NoteCard } from '@/components/note-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { TypographyH1 } from '@/components/ui/typography-h1'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Route as NotesRoute } from '@/routes/notes/$noteIdOrNew'
import type { Note } from '@/types/note'
import { GetAllNotes } from '@/services/note-service'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown } from 'lucide-react'
import { EmptyNoteCard } from '@/components/empty-note-card'
import { NoteCardSkeleton } from '@/components/skeleton/note-card-skeleton'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    const [showAll, setShowAll] = useState<boolean>(false);

    const { data: notes = [], isLoading } = useQuery<Note[]>({
        queryKey: ['notes'],
        queryFn: () => GetAllNotes({ isShort: false }),
        staleTime: 5 * 60 * 1000
    })

    const [columns, setColumns] = useState<number>(4);
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) setColumns(1);
            else if (window.innerWidth < 1024) setColumns(2);
            else setColumns(4);
        }

        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, [])

    const visibleNotes = showAll ? notes : notes.slice(0, columns);

    return (
        <Container className='flex flex-col gap-4 justify-center items-center h-full'>

            <Container className='flex flex-col gap-4 items-center'>
                <TypographyH1>Better Notes</TypographyH1>
                <Link to={NotesRoute.to} params={{ noteIdOrNew: 'new' }} className='max-w-52 w-full'>
                    <Button className='w-full' size={'lg'}>Yaz</Button>
                </Link>
                <Link to='/short-notes' className='max-w-52 w-full'>
                    <Button className='w-full' size={'lg'}>Kısa</Button>
                </Link>
            </Container>

            <Separator></Separator>

            {/* TODO: Yükseklik arttığında yukarıya doğru yükseliyor. Aşağıya doğru olmalı */}
            <ScrollArea className={`${showAll ? 'h-84' : 'h-40'}`}>
                <Container className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {isLoading && Array.from({ length: columns }).map((_, i) => <NoteCardSkeleton key={i} />)}
                    {
                        !isLoading && visibleNotes?.length ? (
                            visibleNotes.map((note: Note) => (
                                <NoteCard key={note.id} note={note} />
                            ))
                        )
                        :
                        (
                            <EmptyNoteCard />
                        )
                    }

                </Container>
            </ScrollArea>

            {
                !isLoading && visibleNotes?.length >= columns && (
                    <Button
                        onClick={() => setShowAll(prev => !prev)}
                        variant="outline"
                        aria-label={showAll ? 'Gizle' : 'Tümünü göster'}
                        className="p-2 rounded-full"
                    >
                        <ChevronDown
                            className={`h-5 w-5 transition-transform transform ${showAll ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </Button>
                )
            }

        </Container>
    )
}
