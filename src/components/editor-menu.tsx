import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useCurrentEditor } from "@tiptap/react"
import { Button } from "./ui/button";

export const EditorMenu = () => {
    const { editor } = useCurrentEditor();
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