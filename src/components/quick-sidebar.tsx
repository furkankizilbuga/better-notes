import { InputWithButton } from "./input-with-button"
import { NoteCollapsible } from "./note-collapsible"

export const QuickSidebar = () => {

    // TODO: Aktif olan en üstt editable olarak duracak.
    // TODO: scrollArea

    return (
        <div className="h-screen p-4 flex flex-col gap-4">
            <InputWithButton />
            <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11, 12, 13, 14, 15, 16].map((note, index) => (
                    <NoteCollapsible key={index} />
                ))}
            </div>
        </div>
    )
}