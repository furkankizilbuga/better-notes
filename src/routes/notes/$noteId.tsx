import { createFileRoute, useParams } from '@tanstack/react-router'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { GetNoteById, UpdateNoteById } from '@/services/note-service'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { NotePayload } from '@/types/note'
import { useDebounce } from '@/hooks/use-debounce'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setNotePayloadGlobal } from '@/store/slices/noteSlice'

export const Route = createFileRoute('/notes/$noteId')({
	component: RouteComponent,
})

const AUTO_UPDATE_DELAY = 2000;

function RouteComponent() {
	const [notePayload, setNotePayload] = useState<NotePayload | null>(null);
	const params = useParams({ from: '/notes/$noteId' });
	const noteId = Number(params.noteId)
	const { notePayloadGlobal } = useAppSelector(state => state.note);
	const dispatch = useAppDispatch();

	const debouncedNote = useDebounce(notePayload, AUTO_UPDATE_DELAY);

	// Otomatik güncelleme
	useEffect(() => {
		if (debouncedNote) UpdateNoteById(debouncedNote, noteId);
	}, [debouncedNote, noteId])

	// İlk girişte note'u dolduruyoruz.
	useEffect(() => {
		if (!noteId) return;

		GetNoteById(noteId)
			.then((res) => {
				const note = res.data;
				setNotePayload({
					title: notePayloadGlobal?.title || note.title || '',
					content: JSON.parse(notePayloadGlobal?.content || '') || JSON.parse(note.content),
				})

				if (notePayloadGlobal) dispatch(setNotePayloadGlobal(null));
			})
			.catch((err) => console.error('Could not fetch note:', err))
	}, [noteId])

	// Sayfadan ayrılırken kaydetmek için.
	// TODO: payloadın sıfırlanmasını engelleyince kontrol et.
	useEffect(() => {
		return () => {
			if (notePayload) UpdateNoteById(notePayload, noteId);
		}
	}, [noteId])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (notePayload) {
			setNotePayload({ ...notePayload, title: e.target.value });
		}
	}

	return (
		<Container className='my-4 flex flex-col gap-2'>
			<Input onClick={() => console.log(notePayload?.content)} value={notePayload?.title || ""} onChange={handleTitleChange} />
			<TiptapEditor notePayload={notePayload} setNotePayload={setNotePayload} />
		</Container>
	)
}