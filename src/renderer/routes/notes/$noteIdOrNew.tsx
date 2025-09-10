import TiptapEditor from '@/renderer/components/editor/TiptapEditor'
import { Container } from '@/renderer/components/ui/container'
import { Input } from '@/renderer/components/ui/input'
import { useDebounce } from '@/renderer/hooks/use-debounce'
import { stringToJSONContent } from '@/renderer/lib/utils'
import { DataService } from '@/renderer/services/data-service'
import type { Note, NotePayload } from '@/renderer/types/note'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'

export const Route = createFileRoute('/notes/$noteIdOrNew')({
	component: RouteComponent,
})

const AUTO_UPDATE_DELAY = 1000;

function RouteComponent() {
	const [notePayload, setNotePayload] = useState<NotePayload | null>(null)
	const { noteIdOrNew } = useParams({ from: '/notes/$noteIdOrNew' })

	// Hızlı karakter girdiğimizde arka arkada create yapmasın diye flag.
	const isCreating = useRef(false);

	const debouncedNote = useDebounce(notePayload, AUTO_UPDATE_DELAY)
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	// CreateNote
	const createNoteMutation = useMutation({
		mutationFn: DataService.CreateNote,
		onSuccess: (res) => {
			// TODO: invalidateQueries
			//queryClient.invalidateQueries({ queryKey: ['notes'] });
			queryClient.refetchQueries({ queryKey: ['notes'] });
			navigate({ to: `/notes/${res.externalId}`, replace: true })
		}
	})

	// TODO: Update yapıp ana sayfaya dönünce NoteCard'lar gelmiyor
	// UpdateNoteById
	const updateNoteMutation = useMutation({
		mutationFn: ({ notePayload, externalId }: { notePayload: NotePayload, externalId: string }) => {
			return DataService.UpdateNoteByExternalId(notePayload, externalId);
		},
		onSuccess: (res) => {
			queryClient.setQueryData<Note[]>(['notes'], (oldNotes = []) => (
				oldNotes.map(note => note.externalId === res.externalId ? res : note)
			))
		}
	})

	// GetNoteById
	const { data: note } = useQuery<Note>({
		queryKey: ['note', noteIdOrNew],
		queryFn: () => DataService.GetNoteByExternalId(noteIdOrNew),
		enabled: noteIdOrNew !== 'new'
	});

	// Yeni not oluştururken db'ye ilk kayıt işlemi
	useEffect(() => {
		if (noteIdOrNew === 'new' && notePayload && !isCreating.current) {
			createNoteMutation.mutate(notePayload);
			isCreating.current = true;
		}
	}, [notePayload, noteIdOrNew])

	useEffect(() => {
		if (!note) return;
		setNotePayload({
			title: note.title || '',
			content: note.content,
		})
	}, [note])

	useEffect(() => {
		if (debouncedNote && noteIdOrNew !== 'new') {
			updateNoteMutation.mutate({ notePayload: debouncedNote, externalId: noteIdOrNew })
		}
	}, [noteIdOrNew, debouncedNote])

	// Sayfadan ayrılırken güncelle
	useEffect(() => {
		return () => {
			if (debouncedNote && noteIdOrNew !== 'new') updateNoteMutation.mutate({ notePayload: debouncedNote, externalId: noteIdOrNew })
		}
	}, [])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNotePayload(prev =>
			prev
				? { ...prev, title: e.target.value }
				: { title: e.target.value, content: stringToJSONContent("") }
		)
	}

	return (
		<Container className='my-4 flex flex-col gap-2' >
			<Input value={notePayload?.title || ''} onChange={handleTitleChange} />
			<TiptapEditor notePayload={notePayload} setNotePayload={setNotePayload} />
		</Container >
	)
}
