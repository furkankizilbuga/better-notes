import { EmptyNoteCard } from '@/renderer/components/empty-note-card'
import { NoteCard } from '@/renderer/components/note-card'
import { NoteCardSkeleton } from '@/renderer/components/skeleton/note-card-skeleton'
import { Container } from '@/renderer/components/ui/container'
import { DataService } from '@/renderer/services/data-service'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/notes/')({
	component: RouteComponent,
})

// TODO: Filtreleme yapılacak. (Tarih, tag)
function RouteComponent() {
	const { data: notes = [], isLoading } = useQuery({
		queryKey: ['notes'],
		queryFn: DataService.GetAllNotes,
		staleTime: 5 * 60 * 1000
	})

	const [columns, setColumns] = useState<number>(4);
	useEffect(() => {
		const updateColumns = () => {
			if (window.innerWidth < 640) setColumns(2);
			else if (window.innerWidth < 1024) setColumns(4);
			else setColumns(8);
		}

		window.addEventListener('resize', updateColumns);
		return () => window.removeEventListener('resize', updateColumns);
	}, [])

	return (
		<Container className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
			{isLoading && Array.from({ length: columns }).map((_, i) => <NoteCardSkeleton key={i} />)}
			{!isLoading && notes?.map(note => (
				<NoteCard key={note.id} note={note} />
			))}
			{!isLoading && !notes?.length && (
				<EmptyNoteCard />
			)}

		</Container>
	)
}
