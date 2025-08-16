import TiptapEditor from '@/components/editor/TiptapEditor'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { CreateNote, GetNoteById, UpdateNoteById } from '@/services/note-service'
import type { NotePayload } from '@/types/note'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'

export const Route = createFileRoute('/notes/$noteIdOrNew')({
	component: RouteComponent,
})

const AUTO_UPDATE_DELAY = 2000;

function RouteComponent() {
	const { noteIdOrNew } = useParams({ from: '/notes/$noteIdOrNew' })
	const [notePayload, setNotePayload] = useState<NotePayload | null>(null)
	const debouncedNote = useDebounce(notePayload, AUTO_UPDATE_DELAY)
	const navigate = useNavigate();
	const isFromNew = useRef(false);

	// Yeni not oluştururken db'ye ilk kayıt işlemi
	useEffect(() => {
		if (noteIdOrNew === 'new' && notePayload) {
			CreateNote(notePayload)
				.then(res => {
					const note = res.data
					isFromNew.current = true;
					navigate({ to: `/notes/${note.id}`, replace: true })
				})
				.catch(err => console.error("Could not create a new note: ", err))
		}
	}, [notePayload, noteIdOrNew, navigate])

	// Var olan note sayfasına girince çalışıyor
	useEffect(() => {
		if (noteIdOrNew === 'new' || isFromNew.current) return;
		GetNoteById(Number(noteIdOrNew))
			.then((res) => {
				const note = res.data
				setNotePayload({
					title: note.title || '',
					content: JSON.parse(note.content),
				})
			})
			.catch((err) => console.error('Could not fetch note:', err))
	}, [noteIdOrNew])

	useEffect(() => {
		return () => {
			if (debouncedNote && noteIdOrNew !== 'new') UpdateNoteById(debouncedNote, Number(noteIdOrNew))
		}
	}, [noteIdOrNew, debouncedNote])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (notePayload) setNotePayload({ ...notePayload, title: e.target.value })
	}

	return (
		<Container className='my-4 flex flex-col gap-2' >
			<Input value={notePayload?.title || ''} onChange={handleTitleChange} />
			<TiptapEditor notePayload={notePayload} setNotePayload={setNotePayload} />
		</Container >
	)
}
