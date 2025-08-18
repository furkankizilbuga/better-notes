import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "./ui/button";
import { Editor } from '@tiptap/react'

export const EditorMenu = ({ editor }: { editor: Editor | null }) => {
    if (!editor) return null;
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button
                        className={`${editor.isActive('bold') ? 'bg-primary' : 'bg-white shadow-md text-primary hover:bg-primary/10'}`}
                        size={'icon'}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        B
                    </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Button
                        className={`${editor.isActive('italic') ? 'bg-primary' : 'bg-white shadow-md text-primary hover:bg-primary/10'}`}
                        size={'icon'}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        I
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu >
    )
}