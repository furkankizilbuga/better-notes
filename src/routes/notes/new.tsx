import { createFileRoute, useNavigate } from '@tanstack/react-router'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { CreateNote } from '@/services/note-service'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { NotePayload } from '@/types/note'
import { useAppDispatch } from '@/hooks/redux'
import { setNotePayloadGlobal } from '@/store/slices/noteSlice'

export const Route = createFileRoute('/notes/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const [notePayload, setNotePayload] = useState<NotePayload | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// Not girildikten sonra yeni bir oluşturup url'i güncelliyoruz.
	useEffect(() => {
		if (!notePayload) return;
		CreateNote(notePayload)
			.then(res => {
				const note = res.data;
				dispatch(setNotePayloadGlobal(note))
				navigate({ to: `/notes/${note.id}` })
			})
			.catch(err => console.error("Could not create a new note: ", err))
	}, [notePayload, navigate])

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNotePayload({...notePayload, title: e.target.value})
	}

	return (
		<Container className='my-4 flex flex-col gap-2'>
			<Input value={notePayload?.title || ""} onChange={handleTitleChange} />
			<TiptapEditor setNotePayload={setNotePayload} from='new' />
		</Container>
	)
}
