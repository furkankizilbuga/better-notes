import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { JSONContent } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function JSONContentToString(json: JSONContent): string {
    if (!json?.content) return ""

    let result = ""

    json.content.forEach(node => {
        if (node.type === "paragraph" && node.content) {
            node.content.forEach(child => {
                if (child.type === "text" && child.text) {
                    result += child.text
                }
            })
            result += "\n"
        }
    })

    return result.trim()
}

export function stringToJSONContent(plainText: string): JSONContent {
    return {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: plainText }
                ]
            }
        ]
    };
}