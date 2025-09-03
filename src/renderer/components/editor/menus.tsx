import { BubbleMenu, FloatingMenu, useCurrentEditor } from "@tiptap/react"

export const Menus = () => {
    const { editor } = useCurrentEditor();
    return (
        <>
            <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
        </>
    )
}