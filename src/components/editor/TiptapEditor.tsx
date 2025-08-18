import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, type Dispatch, type SetStateAction } from 'react'
import { EditorMenu } from '../editor-menu'
import type { NotePayload, TiptapNode } from '@/types/note'

const extensions = [
	StarterKit,
	Placeholder.configure({
		placeholder: 'Bir metin giriniz.',
		emptyEditorClass:
			'text-gray-400 before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:pointer-events-none before:h-0',
	}),
]

const editorProps = {
	attributes: {
		class: 'shadow-lg rounded-md prose prose-sm sm:prose lg:prose-lg xl:prose-2xl outline-none mx-auto min-h-[200px] p-4',
	},
}

type TiptapEditorProps = {
	setNotePayload: Dispatch<SetStateAction<NotePayload | null>>
	notePayload?: NotePayload | null
}

const TiptapEditor = ({ setNotePayload, notePayload }: TiptapEditorProps) => {
	const editor = useEditor({
		extensions,
		content: notePayload?.content || '',
		editorProps,
		onUpdate({ editor }) {
			const updatedContent: TiptapNode = editor.getJSON()
			setNotePayload(prev => ({ ...prev, content: updatedContent }))
		},
	})

	useEffect(() => {
		if (editor && notePayload?.content) {
			editor.commands.setContent(notePayload.content)
		}
	}, [notePayload?.content, editor])

	return (
		<div className="flex flex-col gap-2">
			<EditorMenu editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}

export default TiptapEditor
