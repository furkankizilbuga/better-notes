import TiptapEditor from '@/renderer/components/editor/TiptapEditor'
import { Container } from '@/renderer/components/ui/container'
import { Input } from '@/renderer/components/ui/input'
import { useDebounce } from '@/renderer/hooks/use-debounce'
import { CreateNote, GetNoteById, UpdateNoteById } from '@/renderer/services/note-service'
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
		mutationFn: CreateNote,
		onSuccess: (res) => {
			debugger
			const note = res.data;
			// TODO: invalidateQueries
			//queryClient.invalidateQueries({ queryKey: ['notes'] });
			queryClient.refetchQueries({ queryKey: ['notes'] });
			navigate({ to: `/notes/${note.id}`, replace: true })
		}
	})

	// TODO: Update yapıp ana sayfaya dönünce NoteCard'lar gelmiyor
	// UpdateNoteById
	const updateNoteMutation = useMutation({
		mutationFn: ({ note, noteId }: { note: NotePayload, noteId: number }) => {
			return UpdateNoteById(note, noteId)
		},
		onSuccess: (res) => {
			const updatedNote = res.data;
			queryClient.setQueryData<Note[]>(['notes'], (oldNotes = []) => (
				oldNotes.map(note => (
					note.id === updatedNote.id
						? { ...updatedNote, content: JSON.parse(updatedNote.content) }
						: note
				))
			))
		}
	})

	// GetNoteById
	const { data: note } = useQuery<Note>({
		queryKey: ['note', noteIdOrNew],
		queryFn: () => GetNoteById(Number(noteIdOrNew)),
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
		if (note) {
			setNotePayload({
				title: note.title || '',
				content: note.content,
			})
		}
	}, [note])

	useEffect(() => {
		if (debouncedNote && noteIdOrNew !== 'new') updateNoteMutation.mutate({ note: debouncedNote, noteId: Number(noteIdOrNew) })
	}, [noteIdOrNew, debouncedNote])

	// Sayfadan ayrılırken güncelle
	useEffect(() => {
		return () => {
			if (debouncedNote && noteIdOrNew !== 'new') updateNoteMutation.mutate({ note: debouncedNote, noteId: Number(noteIdOrNew) })
		}
	}, [])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNotePayload({ ...notePayload || {}, title: e.target.value })
	}

	return (
		<Container className='my-4 flex flex-col gap-2' >
			<Input value={notePayload?.title || ''} onChange={handleTitleChange} />
			<TiptapEditor notePayload={notePayload} setNotePayload={setNotePayload} />
		</Container >
	)
}
