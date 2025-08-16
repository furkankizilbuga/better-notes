import { useCurrentEditor } from "@tiptap/react"

export const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="border-b border-gray-300 p-2 flex gap-2 flex-wrap bg-gray-50">
            <div>

            </div>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded text-sm font-medium border ${editor.isActive('bold')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
            >
                Kalın
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded text-sm font-medium border ${editor.isActive('italic')
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
            >
                İtalik
            </button>
        </div>
    )
}