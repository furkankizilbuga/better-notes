import { EditorProvider  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { type Dispatch, type SetStateAction } from 'react';
import { EditorMenu } from '../editor-menu';
import Placeholder from '@tiptap/extension-placeholder';
import type { NotePayload, TiptapNode } from '@/types/note';

const extensions = [
	StarterKit,
	Placeholder.configure({
		placeholder: 'Bir metin giriniz.',
		emptyEditorClass: 'text-gray-400 before:content-[attr(data-placeholder)] before:absolute before:text-gray-400 before:pointer-events-none before:h-0',
	})
]

const editorProps = {
	attributes: {
		class: 'shadow-lg rounded-md prose prose-sm sm:prose lg:prose-lg xl:prose-2xl outline-none mx-auto min-h-[200px] p-4',
	},
}

type TiptapEditorProps = {
	setNotePayload: Dispatch<SetStateAction<NotePayload | null>>;
	notePayload?: NotePayload | null;
	from?: 'new'
}

const TiptapEditor = ({ setNotePayload, notePayload, from }: TiptapEditorProps) => {
	if (from !== 'new' && !notePayload?.content) {
		return <div>Loading...</div>
	}
	return (
		<EditorProvider
			slotBefore={<EditorMenu />}
			extensions={extensions}
			content={notePayload?.content || undefined}
			editorProps={editorProps}
			onUpdate={({ editor }) => {
				const updatedContent: TiptapNode = editor.getJSON();
				setNotePayload((prev) => ({ ...prev, content: updatedContent }))
			}}
		>
		</EditorProvider>
	)
}

export default TiptapEditor;
